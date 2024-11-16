// src/components/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
import Register from './Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // Add more routes here
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;