import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import {
  useFetchAllProductsQuery,
  useLazyFetchAllProductsQuery,
} from "../../features/products/productService";
import { useNotifier } from "../../hooks/useNotifier";
import { selectUser } from "../../features/auth/authSelectors";
import ProductCard from "./ProductCard";

function VendorDashboard() {
  const { data: allProductsInfo } = useFetchAllProductsQuery();
  const { notificationMsg } = useNotifier();
  const user = useSelector(selectUser);

  const vendorProducts = useMemo(() => {
    if (!allProductsInfo?.products) return [];
    return allProductsInfo.products.filter(
      (product) => product.store.owner._id === user.userId,
    );
  }, [allProductsInfo, user.userId]);

  useEffect(() => {
    if (vendorProducts.length > 0) {
      notificationMsg("info", "Fetched Vendor Products");
    }
  }, [vendorProducts]);

  return (
    <div className="container py-4">
      <div className="row">
        {vendorProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default VendorDashboard;
