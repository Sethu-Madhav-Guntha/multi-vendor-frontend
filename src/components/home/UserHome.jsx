import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  useFetchAllProductsQuery,
  useLazyFetchAllProductsQuery,
} from "../../features/products/productService";
import { useAddToCartMutation } from "../../features/cart/cartService";
import { useCreateOrderMutation } from "../../features/order/orderService";
import { useNotifier } from "../../hooks/useNotifier";
import { selectIsUser } from "../../features/auth/authSelectors";
import ProductCard from "./ProductCard";

function UserHome() {
  const [addToCartFn] = useAddToCartMutation();
  const [createOrderFn] = useCreateOrderMutation();
  const { data: allProductsInfo } = useFetchAllProductsQuery();
  const [fetchAllProductsFn] = useLazyFetchAllProductsQuery();
  const { notificationMsg } = useNotifier();
  const isUser = useSelector(selectIsUser);

  useEffect(() => {
    if (allProductsInfo?.message) {
      notificationMsg("info", allProductsInfo?.message);
    }
  }, [allProductsInfo]);

  const onCartProductClick = async (productId, sellingPrice) => {
    try {
      const res = await addToCartFn({ productId, sellingPrice });
      notificationMsg("success", res.data.message);
      await fetchAllProductsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onBuyProductClick = async (product, sellingPrice) => {
    try {
      await createOrderFn({
        items: [{ productId: product._id, quantity: 1, sellingPrice }],
      });
      notificationMsg("success", `${product.productName} has been placed Order.`);
      fetchAllProductsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        {allProductsInfo?.products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isUser={isUser}
            onCartClick={onCartProductClick}
            onBuyClick={onBuyProductClick}
          />
        ))}
      </div>
    </div>
  );
}

export default UserHome;