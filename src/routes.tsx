import { Navigate, Outlet, createBrowserRouter, useLocation, useNavigate } from "react-router-dom";
import LayoutHomepage from "./component/layoutHomepage";
import Home from "./page/HomePage/Home";
import Adminproduct from "./page/admin";
import LayoutAdmin from "./component/LayoutAdmin";
import EditProduct from "./page/admin/EditProduct";
import AdminAddProduct from "./page/admin/AdminAddProduct";
import About from "./page/ProductDetail/ProductDetail";
import Signin from "./page/auth/signin";
import Signup from "./page/auth/signup";
import OrderPage from "./page/OrderPage/OrderPage";
import { useEffect } from "react";
import Mycart from "./page/MyCart/MyCart";



const PrivateRoute = ({ isAuth }: any) => {
    console.log(isAuth, 'auth');

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/signin");
        }
    }, [isAuth]);

    return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};


export const router = createBrowserRouter([
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    {
        path: "/", element: <LayoutHomepage />, children: [
            { path: "/", element: <Home /> },
            { path: "/detail/:id", element: <About/> },
            { path: "/cart", element: <Mycart /> },
            { path: "/order/:id", element: <OrderPage/> },
        ]
    },
    {
        path: "/admin",
        element: <PrivateRoute isAuth={true} />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    { index: true, element: <Navigate to="products" /> },
                    { path: "/admin/products", element: <Adminproduct /> },
                    { path: "/admin/products/add", element: <AdminAddProduct /> },
                    { path: "/admin/products/:idProduct", element: <EditProduct /> },

                ]
            },
        ],
    },
]);