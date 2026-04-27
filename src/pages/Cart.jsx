import { useSelector } from "react-redux";
import { useEffect } from "react";

import {
  useAddToCartMutation,
  useCartItemsQuery,
  useClearCartMutation,
  useLazyCartItemsQuery,
  useRemoveItemMutation,
} from "../features/cart/cartService";
import { useCreateOrderMutation } from "../features/order/orderService";
import { useNotifier } from "../hooks/useNotifier";

function Cart() {
  const token = useSelector((state) => state?.authReducer?.token);

  const { data: cartItems, refetch: refetchCartItems } = useCartItemsQuery({
    token,
  });
  const [fetchCartItemsFn] = useLazyCartItemsQuery();
  const [removeCartItemFn] = useRemoveItemMutation();
  const [clearCartFn] = useClearCartMutation();
  const [addToCartFn] = useAddToCartMutation();
  const [createOrderFn] = useCreateOrderMutation();

  const { notificationMsg } = useNotifier();

  const onIncrementItemClick = async (item) => {
    try {
      await addToCartFn({ productId: item.product._id, token });
      fetchCartItemsFn({ token });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onDecrementItemClick = async (item) => {
    try {
      await removeCartItemFn({
        productId: item.product._id,
        token,
        removeAll: false,
      });
      fetchCartItemsFn({ token });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onRemoveItemClick = async (item) => {
    try {
      await removeCartItemFn({
        productId: item.product._id,
        token,
        removeAll: true,
      });
      notificationMsg(
        "default",
        `${item.product.productName} Removed from Cart.`,
      );
      fetchCartItemsFn({ token });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onClearCartClick = async () => {
    try {
      await clearCartFn({ token });
      notificationMsg("default", "Removed all items from Cart.");
      fetchCartItemsFn({ token });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onBuyNowClick = async () => {
    try {
      const items = cartItems?.cart?.items?.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        sellingPrice: item?.product?.sellingPrice,
      }));
      await createOrderFn({ items, token });
      notificationMsg("success", "Cart Items have placed Order.");
      await onClearCartClick();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  useEffect(() => {
    refetchCartItems();
    notificationMsg("info", cartItems?.message);
  }, [cartItems]);

  return (
    <>
      <h1>Cart Page</h1>
      <h2>Products added to Cart</h2>
      {cartItems?.cart?.items.length > 0 && (
        <>
          <h4>Total Price: {cartItems?.totalAmount}/-</h4>
          <button
            onClick={() => {
              onClearCartClick();
            }}
          >
            Clear Cart Items
          </button>
          <button onClick={() => onBuyNowClick()}>Buy Items</button>
        </>
      )}
      <ul>
        {cartItems &&
          cartItems?.cart?.items?.map((item) => (
            <li key={item._id}>
              <h4>Item Name: {item.product?.productName}</h4>
              <h5>Price: {item.product?.price}</h5>
              <h5>Quantity: {item.quantity}</h5>
              <img
                src={item.product?.productImageUrl}
                alt={item.product?.productName}
                style={{ width: "200px", height: "200px" }}
              />
              <h5>Product Discount: {item.product?.productDiscount}</h5>
              <h5>Store Discount: {item.product?.store.storeDiscount}</h5>
              <h5>Store Name: {item.product?.store.storeName}</h5>
              <h5>Store Owner: {item.product?.store.owner.username}</h5>
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
    </>
  );
}
export default Cart;
