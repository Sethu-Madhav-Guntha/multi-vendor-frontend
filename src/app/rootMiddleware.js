import { authApi } from "../features/auth/authService";
import { cartApi } from "../features/cart/cartService";
import { orderApi } from "../features/order/orderService";
import { outletApi } from "../features/outlet/outletService";
import { productApi } from "../features/products/productService";

export const rootMiddleware = (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, outletApi.middleware, productApi.middleware, cartApi.middleware, orderApi.middleware)