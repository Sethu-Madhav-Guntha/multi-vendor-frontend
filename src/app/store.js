import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authSlice } from "../features/auth/authSlice";
import { outletSlice } from "../features/outlet/outletSlice";
import { authApi } from "../features/auth/authService";
import { outletApi } from "../features/outlet/outletService";

export const multiVendorStore = configureStore({
    reducer: {
        authReducer: authSlice.reducer,
        outletReducer: outletSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [outletApi.reducerPath]: outletApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, outletApi.middleware),
});
setupListeners(multiVendorStore.dispatch);