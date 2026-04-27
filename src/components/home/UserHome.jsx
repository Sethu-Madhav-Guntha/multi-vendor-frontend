import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  useFetchAllProductsQuery,
  useLazyFetchAllProductsQuery,
} from "../../features/products/productService";
import { useAddToCartMutation } from "../../features/cart/cartService";
import { useCreateOrderMutation } from "../../features/order/orderService";
import { useNotifier } from "../../hooks/useNotifier";

function UserHome() {
  const [addToCartFn] = useAddToCartMutation();
  const [createOrderFn] = useCreateOrderMutation();
  const { data: allProductsInfo } = useFetchAllProductsQuery();
  const [fetchAllProductsFn] = useLazyFetchAllProductsQuery();

  const { notificationMsg } = useNotifier();

  const userInfo = useSelector((state) => state?.authReducer);

  useEffect(() => {
    if (allProductsInfo?.message) {
      notificationMsg("info", allProductsInfo?.message);
    }
  }, [allProductsInfo]);

  const onCartProductClick = async (productId, sellingPrice) => {
    try {
      const addProductToCartResut = await addToCartFn({
        productId,
        sellingPrice,
        token: userInfo?.token,
      });
      notificationMsg("success", addProductToCartResut.data.message);
      await fetchAllProductsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onBuyProductClick = async (product, sellingPrice) => {
    try {
      await createOrderFn({
        items: [{ productId: product._id, quantity: 1, sellingPrice }],
        token: userInfo?.token,
      });
      notificationMsg(
        "success",
        `${product.productName} has been placed Order.`,
      );
      fetchAllProductsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  return (
    <>
      <ul>
        {allProductsInfo?.products?.map((product) => (
          <li key={product._id}>
            <h4>{product.productName}</h4>
            <img
              src={product.productImageUrl}
              alt={product.productName}
              style={{ width: "200px", height: "200px" }}
            />
            <h5>Price: {product.price}</h5>
            <h6>Quantity: {product.quantity}</h6>
            <h6>Product Discount: {product.productDiscount}</h6>
            <h6>Store Discount: {product.store.storeDiscount}</h6>
            <h6>Store Name: {product.store.storeName}</h6>
            <h6>Owner: {product.store.owner.username}</h6>
            <img
              src={product.store.owner.profileImg}
              alt={product.store.owner.username}
              style={{ width: "100px", height: "100px" }}
            />
            <h6>Selling Price: {product.sellingPrice}</h6>
            {userInfo?.user?.role === "User" && (
              <>
                <button
                  onClick={() => {
                    onCartProductClick(product._id, product.sellingPrice);
                  }}
                >
                  Cart
                </button>
                <button
                  onClick={() => {
                    onBuyProductClick(product, product.sellingPrice);
                  }}
                >
                  Buy
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default UserHome;
