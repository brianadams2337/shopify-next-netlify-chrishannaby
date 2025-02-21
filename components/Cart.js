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

      setCheckoutURL(jsonCheckoutURL?.cart?.checkoutUrl);
      setProducts(json?.cart?.lines.edges);
      setCost(json?.cart?.estimatedCost);
      return [json, jsonCheckoutURL];
    }
  }, []);

  return (
    <div className="container-cart">
      {showProducts && products?.length > 0 ? (
        <div>
          <CartTable
            cartItems={products}
            cartId={cartId}
            removeItem={setProducts}
          />
          <CartTotal cost={cost} />
          <Link href={checkoutURL}>
            <a className="checkout cta">
              <button>Go To Checkout {`>`}</button>
            </a>
          </Link>
        </div>
      ) : (
        <div className="cart-page-message">
          There are no items in your cart.
        </div>
      )}
    </div>
  );
}
