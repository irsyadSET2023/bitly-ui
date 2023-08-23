import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import React from "react";
import Links from "./pages/Links";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    { path: "/register", element: <Register /> },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/links",
      element: <Links />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
