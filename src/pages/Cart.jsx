import { useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useCartItemsQuery,
  useClearCartMutation,
  useLazyCartItemsQuery,
  useRemoveItemMutation,
} from "../features/cart/cartService";
import { useEffect } from "react";
import { useCreateOrderMutation } from "../features/order/orderService";

function Cart() {
  const token = useSelector((state) => state?.authReducer?.token);
  const { data: cartItems, refetch } = useCartItemsQuery({ token });
  const [fetchCartItemsFn] = useLazyCartItemsQuery();
  const [removeCartItemFn] = useRemoveItemMutation();
  const [clearCartFn] = useClearCartMutation();
  const [addToCartFn] = useAddToCartMutation();
  const [createOrderFn] = useCreateOrderMutation();

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

  const onBuyNowClick = async () => {
    const items = cartItems?.cart?.items?.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
      sellingPrice: item.product.sellingPrice
    }));
    await createOrderFn({ items, token });
    await onClearCartClick();
    console.log("Buying Cart Items");
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
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
              <h4>Item Name: {item.product.productName}</h4>
              <h5>Price: {item.product.price}</h5>
              <h5>Quantity: {item.quantity}</h5>
              <img
                src={item.product.productImageUrl}
                alt={item.product.productName}
                style={{ width: "200px", height: "200px" }}
              />
              <h5>Product Discount: {item.product.productDiscount}</h5>
              <h5>Store Discount: {item.product.store.storeDiscount}</h5>
              <h5>Store Name: {item.product.store.storeName}</h5>
              <h5>Store Owner: {item.product.store.owner.username}</h5>
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
