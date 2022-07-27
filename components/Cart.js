import Link from 'next/link';
import { useState, useEffect } from "react";
import { useAppContext } from "../state";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";

export default function Cart() {
  const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [cost, setCost] = useState({});
  const [checkoutURL, setCheckoutURL] = useState({});
  const { cartId, setCartId } = useAppContext();

  useEffect(async () => {
    const localCart = cartId;

    if (localCart === null) {
      setShowProducts(false);
    } else {
      setCartId(localCart);
      const response = await fetch("/.netlify/functions/get-cart", {
        method: "post",
        body: JSON.stringify({
          cartId: localCart,
        }),
        headers: { "Content-Type": "application/json" },
      });


      const checkoutResponse = await fetch("/.netlify/functions/get-checkout", {
        method: "post",
        body: JSON.stringify({
          cartId: localCart,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const jsonCheckoutURL = await checkoutResponse.json();
      const json = await response.json();

      console.log('checkout resp', checkoutResponse);
      console.log('checkout resp', jsonCheckoutURL);

      console.log('resp', response);
      console.log('resp', json);

      console.log(localCart);

      setCheckoutURL(jsonCheckoutURL?.cart?.checkoutUrl);
      setProducts(json?.cart?.lines.edges);
      setCost(json?.cart?.estimatedCost);
      return [json, jsonCheckoutURL];
    }
  }, []);

  return (
    <div>
      {showProducts && products?.length > 0 ? (
        <div>
          <CartTable
            cartItems={products}
            cartId={cartId}
            removeItem={setProducts}
          />
          <CartTotal cost={cost} />
          <Link href={checkoutURL}>
            <a>
              <button>Go to checkout</button>
            </a>
          </Link>
          <a href={checkoutURL}>Go to checkout</a>
        </div>
      ) : (
        <div className="cart-page-message">
          No products to show! Get shopping!
        </div>
      )}
    </div>
  );
}
