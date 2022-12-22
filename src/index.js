import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import ViewPage from "./pages/ViewPage";
import EditPage from "./pages/EditPage";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new",
    element: <NewTask />,
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
  },
  {
    path: "/:id",
    element: <ViewPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
