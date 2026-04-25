import { useSelector } from "react-redux";
import {
  useFetchAllProductsQuery,
  useLazyFetchAllProductsQuery,
} from "../features/products/productService";
import { useAddToCartMutation } from "../features/cart/cartService";
import { useCreateOrderMutation } from "../features/order/orderService";

function Home() {
  const [addToCartFn] = useAddToCartMutation();
  const [createOrderFn] = useCreateOrderMutation();
  const { data: allProducts } = useFetchAllProductsQuery();
  const [fetchAllProductsFn] = useLazyFetchAllProductsQuery();
  const userInfo = useSelector((state) => state?.authReducer);

  const onCartProductClick = async (productId, sellingPrice) => {
    await addToCartFn({ productId, sellingPrice, token: userInfo?.token });
    fetchAllProductsFn();
  };

  const onBuyProductClick = async (productId, sellingPrice) => {
    await createOrderFn({
      items: [{ productId, quantity: 1, sellingPrice }],
      token: userInfo?.token,
    });
    fetchAllProductsFn();
  };

  return (
    <div>
      <h1>Home Page</h1>
      {userInfo?.user?.role === "Vendor" && (
        <>
          <h1>Vendor Logged In</h1>
        </>
      )}
      {(!userInfo || !(userInfo?.user?.role === "Vendor")) && (
        <>
          <ul>
            {allProducts?.products?.map((product) => (
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
                        onBuyProductClick(product._id, product.sellingPrice);
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
      )}
    </div>
  );
}
export default Home;
