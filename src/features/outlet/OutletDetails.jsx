import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

import {
  useFetchOutletByIdQuery,
  useLazyFetchOutletByIdQuery,
} from "./outletService";
import {
  useCreateProductMutation,
  useLazyFetchProductByIdQuery,
  useRemoveProductMutation,
  useUpdateProductMutation,
} from "../products/productService";
import { useNotifier } from "../../hooks/useNotifier";

function OutletDetails() {
  const [editProduct, setEditProduct] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  const productNameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const productImageUrlRef = useRef();
  const productDiscountRef = useRef();

  const { outletId } = useParams();
  const token = useSelector((state) => state?.authReducer?.token);

  const [createProductFn] = useCreateProductMutation();
  const [updateProductFn] = useUpdateProductMutation();
  const [deleteProductFn] = useRemoveProductMutation();
  const [fetchProductByIdFn] = useLazyFetchProductByIdQuery();

  const { data: storeDetails } = useFetchOutletByIdQuery({ outletId, token });
  const [fetchStoreDetailsFn] = useLazyFetchOutletByIdQuery();
  const { notificationMsg } = useNotifier();

  useEffect(()=>{
    notificationMsg("info", storeDetails?.message);
  }, [storeDetails]);

  const onUpdateProductClick = (product) => {
    setEditProduct(true);
    setProductInfo(product);
    productNameRef.current.value = product.productName;
    descriptionRef.current.value = product.description;
    priceRef.current.value = product.price;
    quantityRef.current.value = product.quantity;
    productImageUrlRef.current.value = product.productImageUrl;
    productDiscountRef.current.value = product.productDiscount;
    notificationMsg("warning", `Updating ${product.productName} Details.`);
  };

  const onDeleteProductClick = async (productId) => {
    try {
      const product = await fetchProductByIdFn({productId, token});
      await deleteProductFn({ productId, token });
      notificationMsg("default", `${product.data.product.productName} Product Removed.`);
      fetchStoreDetailsFn({ outletId, token });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onProductDetailsSubmit = async () => {
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
      const createdProductDetials = await createProductFn({
        productInfo: { ...productFormData, storeId: outletId },
        token,
      });
      notificationMsg("success", createdProductDetials.data.message);
    }
    fetchStoreDetailsFn({ outletId, token });
  };

  return (
    <div>
      <Link to="/outlets">Outlet List</Link>
      <h1>Outlet Details</h1>
      <img
        src={storeDetails?.store?.storeImg}
        alt={storeDetails?.store?.storeName}
        style={{ width: "200px", height: "200px", borderRadius: "30px" }}
      />
      <h2>Outlet: {storeDetails?.store?.storeName}</h2>
      <h3>Description: {storeDetails?.store?.description}</h3>
      <h2>{editProduct ? "Update" : "Create"} Product</h2>
      <form onSubmit={onProductDetailsSubmit}>
        <label htmlFor="productNameId">Enter Product Name:</label>
        <input
          type="text"
          name="productName"
          id="productNameId"
          placeholder="Provide Product Name Here"
          ref={productNameRef}
        />
        <br />
        <label htmlFor="productDescriptionId">Enter Product Description:</label>
        <textarea
          name="description"
          id="productDescriptonId"
          style={{ width: "300px", height: "50px" }}
          ref={descriptionRef}
        />
        <br />
        <label htmlFor="priceId">Enter Product Price:</label>
        <input
          type="number"
          name="price"
          id="priceId"
          placeholder="Provide Product Price Here"
          ref={priceRef}
        />
        <br />
        <label htmlFor="quantityId">Enter Product Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantityId"
          placeholder="Provide Product Quantity Here"
          ref={quantityRef}
        />
        <br />
        <label htmlFor="imageUrlId">Enter Product Image URL:</label>
        <input
          type="text"
          name="productImageUrl"
          id="imageUrlId"
          placeholder="Provide Product Image URL Here"
          ref={productImageUrlRef}
        />
        <br />
        <label htmlFor="productDiscountId">Product Discount:</label>
        <input
          type="number"
          name="productDiscount"
          id="productDiscountId"
          defaultValue={0}
          ref={productDiscountRef}
        />
        <br />
        <button type="submit">
          {editProduct ? "Update" : "Create"} Product
        </button>
      </form>
      <h2>Product List:</h2>
      <ul>
        {storeDetails?.store?.products?.map((product) => (
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
            <h6>Store Discount: {product.store.storeName}</h6>
            <h6>Store Owner: {storeDetails.store.owner.username}</h6>
            <h5>Selling Price: {product.sellingPrice}</h5>
            <button
              onClick={() => {
                onUpdateProductClick(product);
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                onDeleteProductClick(product._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default OutletDetails;
