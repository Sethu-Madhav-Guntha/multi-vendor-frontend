import { useSelector } from "react-redux";
import { useFetchAllProductsQuery } from "../features/products/productService";
import { useAddToCartMutation } from "../features/cart/cartService";

function Home() {
  const [addToCartFn] = useAddToCartMutation();
  const { data: allProducts } = useFetchAllProductsQuery();
  const userInfo = useSelector((state) => state?.authReducer);

  const onCartProductClick = async (productId) => {
    await addToCartFn({ productId, token: userInfo?.token });
  };

  const onBuyProductClick = (productId) => {
    console.log("Buying Product", productId);
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
                {userInfo?.user?.role === "User" && (
                  <>
                    <button
                      onClick={() => {
                        onCartProductClick(product._id);
                      }}
                    >
                      Cart
                    </button>
                    <button
                      onClick={() => {
                        onBuyProductClick(product._id);
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
