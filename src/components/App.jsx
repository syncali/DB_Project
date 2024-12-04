import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { CartProvider } from "./../context/CartContext";
import CategoryPage from "./CategoryPage";
import { AuthProvider } from "./../context/AuthContext";
import Rewards from "./Rewards";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManagement from "./admin/ProductManagement";
import OrderManagement from "./admin/OrderManagement";
import OrderDetails from "./admin/OrderDetails-Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/products/:category",
        element: <CategoryPage />,
      },
      {
        path: "/rewards",
        element: <Rewards />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/products",
    element: <ProductManagement />,
  },
  {
    path: "/admin/orders",
    element: <OrderManagement />,
  },
  {
    path: "/admin/orders/:orderId",
    element: <OrderDetails />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
