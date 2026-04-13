import { useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useCartItemsQuery,
  useClearCartMutation,
  useLazyCartItemsQuery,
  useRemoveItemMutation,
} from "../features/cart/cartService";
import { useEffect } from "react";

function Cart() {
  const token = useSelector((state) => state?.authReducer?.token);
  const { data: cartItems, refetch } = useCartItemsQuery({ token });
  const [fetchCartItemsFn] = useLazyCartItemsQuery();
  const [removeCartItemFn] = useRemoveItemMutation();
  const [clearCartFn] = useClearCartMutation();
  const [addToCartFn] = useAddToCartMutation();

  const onIncrementItemClick = async (item) => {
    await addToCartFn({ productId: item.product._id, token });
    fetchCartItemsFn({ token });
  };

  const onDecrementItemClick = async (item) => {
    await removeCartItemFn({
      productId: item.product._id,
      token,
      removeAll: false,
    });
    fetchCartItemsFn({ token });
  };

  const onRemoveItemClick = async (item) => {
    await removeCartItemFn({
      productId: item.product._id,
      token,
      removeAll: true,
    });
    fetchCartItemsFn({ token });
  };

  const onClearCartClick = async () => {
    await clearCartFn({ token });
    fetchCartItemsFn({ token });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h1>Cart Page</h1>
      <h2>Products added to Cart</h2>
      <button
        onClick={() => {
          onClearCartClick();
        }}
      >
        Clear Cart Items
      </button>
      <ul>
        {cartItems &&
          cartItems?.cart?.items?.map((item) => (
            <li key={item._id}>
              <h4>Item Name: {item.product.productName}</h4>
              <h5>Price: {item.product.price}</h5>
              <h5>Quantity: {item.quantity}</h5>
              <img
                src={item.product.productImageUrl}
                alt={item.product.productName}
                style={{ width: "200px", height: "200px" }}
              />
              <br />
              <button
                onClick={() => {
                  onDecrementItemClick(item);
                }}
              >
                Decrement Item
              </button>
              <button
                onClick={() => {
                  onIncrementItemClick(item);
                }}
              >
                Increment Item
              </button>
              <button
                onClick={() => {
                  onRemoveItemClick(item);
                }}
              >
                Remove Item
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default Cart;
