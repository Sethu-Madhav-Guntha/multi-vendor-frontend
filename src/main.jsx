import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import "./index.css";
import { multiVendorStore } from "./app/store.js";
import { routes } from "./app/routes.jsx";

const multiVendorRouter = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider maxSnack={4} dense>
      <Provider store={multiVendorStore}>
        <RouterProvider router={multiVendorRouter} />
      </Provider>
    </SnackbarProvider>
  </StrictMode>,
);
