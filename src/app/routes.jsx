import App from "../App";
import Home from "../pages/Home";
import Outlets from "../pages/Outlets";
import OutletDetails from "../pages/OutletDetails";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const routes = [
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
]