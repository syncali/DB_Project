import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
