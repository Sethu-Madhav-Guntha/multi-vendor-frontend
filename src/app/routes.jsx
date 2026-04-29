import App from "../App";
import OutletDetails from "../features/outlet/OutletDetails";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import Outlets from "../pages/Outlets";
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