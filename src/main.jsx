import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Outlets from "./pages/Outlets.jsx";
import OutletDetails from "./features/outlet/OutletDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import { multiVendorStore } from "./app/store.js";

const multiVendorRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/outlets",
        element: <Outlets />,
      },
      {
        path: "/outlets/:outletId",
        element: <OutletDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider maxSnack={4} dense>
      <Provider store={multiVendorStore}>
        <RouterProvider router={multiVendorRouter} />
      </Provider>
    </SnackbarProvider>
  </StrictMode>,
);
