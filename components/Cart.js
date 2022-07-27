import { useState, useEffect } from "react";
import { useAppContext } from "../state";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";

export default function Cart() {
  const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [cost, setCost] = useState({});
  const { cartId, setCartId } = useAppContext();

  useEffect(async () => {
    const localCart = 'gid://shopify/Cart/15854b674a05875df51a6f8d0bd8dfbf';

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

      const jsonCheck = await checkoutResponse.json();
      const json = await response.json();

      console.log('checkout resp', checkoutResponse);
      console.log('checkout resp', jsonCheck);

      console.log('resp', response);
      console.log('resp', json);

      console.log(localCart);


      setProducts(json?.cart?.lines.edges);
      setCost(json?.cart?.estimatedCost);
      return json;
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
        </div>
      ) : (
        <div className="cart-page-message">
          No products to show! Get shopping!
        </div>
      )}
    </div>
  );
}
