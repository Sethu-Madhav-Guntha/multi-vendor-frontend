import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authService";
import { authSlice } from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const multiVendorStore = configureStore({
    reducer: {
        authReducer: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
setupListeners(multiVendorStore.dispatch);