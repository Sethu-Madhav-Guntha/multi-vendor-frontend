import { authApi } from "../features/auth/authService";
import { authSlice } from "../features/auth/authSlice";
import { cartApi } from "../features/cart/cartService";
import { orderApi } from "../features/order/orderService";
import { outletApi } from "../features/outlet/outletService";
import { outletSlice } from "../features/outlet/outletSlice";
import { productApi } from "../features/products/productService";

export const rootReducer = {
    authReducer: authSlice.reducer,
    outletReducer: outletSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [outletApi.reducerPath]: outletApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
}