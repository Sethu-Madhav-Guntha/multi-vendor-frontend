import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

import {
  useFetchOutletByIdQuery,
  useLazyFetchOutletByIdQuery,
} from "../features/outlet/outletService";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} from "../features/products/productService";
import { useNotifier } from "../hooks/useNotifier";
import { selectToken } from "../features/auth/authSelectors";
import ProductForm from "../components/outlets/ProductForm";
import ProductCard from "../components/outlets/OutletProduct";

function OutletDetails() {
  const [editProduct, setEditProduct] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  const refs = {
    productNameRef: useRef(),
    descriptionRef: useRef(),
    priceRef: useRef(),
    quantityRef: useRef(),
    productImageUrlRef: useRef(),
    productDiscountRef: useRef(),
  };

  const { outletId } = useParams();
  const token = useSelector(selectToken);

  const [createProductFn] = useCreateProductMutation();
  const [updateProductFn] = useUpdateProductMutation();
  const [deleteProductFn] = useRemoveProductMutation();
  const { data: storeDetails } = useFetchOutletByIdQuery({ outletId });
  const [fetchStoreDetailsFn] = useLazyFetchOutletByIdQuery();
  const { notificationMsg } = useNotifier();

  useEffect(() => {
    notificationMsg("info", storeDetails?.message);
  }, [storeDetails]);

  const onUpdateProductClick = (product) => {
    setEditProduct(true);
    setProductInfo(product);
    refs.productNameRef.current.value = product.productName;
    refs.descriptionRef.current.value = product.description;
    refs.priceRef.current.value = product.price;
    refs.quantityRef.current.value = product.quantity;
    refs.productImageUrlRef.current.value = product.productImageUrl;
    refs.productDiscountRef.current.value = product.productDiscount;
    notificationMsg("warning", `Updating ${product.productName} Details.`);
  };

  const onDeleteProductClick = async (product) => {
    try {
      await deleteProductFn({ productId: product._id });
      notificationMsg("default", `${product.productName} Product Removed.`);
      fetchStoreDetailsFn({ outletId });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onProductDetailsSubmit = async (event) => {
    event.preventDefault();
    const productForm = new FormData(event.target);
    const productFormData = Object.fromEntries(productForm.entries());
    event.target.reset();

    if (editProduct) {
      const updatedProductDetails = await updateProductFn({
        productInfo: {
          _id: productInfo._id,
          ...productFormData,
          storeId: outletId,
        },
        token,
      });
      notificationMsg("success", updatedProductDetails.data.message);
      setEditProduct(false);
    } else {
      const createdProductDetails = await createProductFn({
        productInfo: { ...productFormData, storeId: outletId },
      });
      notificationMsg("success", createdProductDetails.data.message);
    }
    fetchStoreDetailsFn({ outletId });
  };

  return (
    <div className="container py-4">
      <Link to="/outlets" className="btn btn-link mb-3">
        <i className="bi bi-arrow-left"></i> Back to Outlets
      </Link>

      <h1 className="mb-3">🏬 Outlet Details</h1>
      <div className="text-center mb-4">
        <img
          src={storeDetails?.store?.storeImg}
          alt={storeDetails?.store?.storeName}
          className="rounded mb-3"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <h2>{storeDetails?.store?.storeName}</h2>
        <p className="text-muted">{storeDetails?.store?.description}</p>
        <p className="text-muted">Store Discount: {storeDetails?.store?.storeDiscount}%</p>
      </div>

      <ProductForm
        editProduct={editProduct}
        onSubmit={onProductDetailsSubmit}
        refs={refs}
      />

      <h2 className="mb-3">Products</h2>
      <div className="row">
        {storeDetails?.store?.products?.length > 0 ? (
          storeDetails.store.products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onUpdate={onUpdateProductClick}
              onDelete={onDeleteProductClick}
            />
          ))
        ) : (
          <div className="alert alert-info text-center">
            No products available for this outlet
          </div>
        )}
      </div>
    </div>
  );
}

export default OutletDetails;