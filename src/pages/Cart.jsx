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
import CartItem from "../components/CartItem";

function Cart() {
  const token = useSelector((state) => state?.authReducer?.token);

  const { data: cartItems, refetch: refetchCartItems } = useCartItemsQuery();
  const [fetchCartItemsFn] = useLazyCartItemsQuery();
  const [removeCartItemFn] = useRemoveItemMutation();
  const [clearCartFn] = useClearCartMutation();
  const [addToCartFn] = useAddToCartMutation();
  const [createOrderFn] = useCreateOrderMutation();

  const { notificationMsg } = useNotifier();

  const onIncrementItemClick = async (item) => {
    try {
      await addToCartFn({ productId: item.product._id });
      fetchCartItemsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onDecrementItemClick = async (item) => {
    try {
      await removeCartItemFn({ productId: item.product._id, removeAll: false });
      fetchCartItemsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onRemoveItemClick = async (item) => {
    try {
      await removeCartItemFn({ productId: item.product._id, removeAll: true });
      notificationMsg(
        "default",
        `${item.product.productName} Removed from Cart.`,
      );
      fetchCartItemsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onClearCartClick = async () => {
    try {
      await clearCartFn();
      notificationMsg("default", "Removed all items from Cart.");
      fetchCartItemsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onBuyNowClick = async () => {
    try {
      const items = cartItems?.cart?.items?.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        sellingPrice: item.product?.sellingPrice,
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
    <div className="container py-4">
      <h1 className="mb-3">🛒 Cart</h1>

      {cartItems?.cart?.items?.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Total Cart Price: 💰 ₹{cartItems?.totalAmount}/-</h4>
            <div className="btn-group">
              <div className="btn-group">
                <button
                  className="btn btn-outline-danger"
                  onClick={onClearCartClick}
                >
                  <i className="bi bi-trash"></i> Clear Cart
                </button>
                <button className="btn btn-outline-primary" onClick={onBuyNowClick}>
                  <i className="bi bi-bag-check"></i> Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            {cartItems?.cart?.items?.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onDecrement={onDecrementItemClick}
                onIncrement={onIncrementItemClick}
                onRemove={onRemoveItemClick}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="alert alert-info text-center">
          🛒 Your cart is empty. Start adding products!
        </div>
      )}
    </div>
  );
}

export default Cart;
