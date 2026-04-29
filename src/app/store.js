import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer";
import { rootMiddleware } from "./rootMiddleware";

export const multiVendorStore = configureStore({
    reducer: rootReducer,
    middleware: rootMiddleware
});