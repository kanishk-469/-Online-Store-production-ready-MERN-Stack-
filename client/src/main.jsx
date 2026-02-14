import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { store } from "../src/redux/store/store";
import App from "./App";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import Error from "../src/pages/PageNotFound/Error";
import Order from "../src/pages/Order/Order";
import Auth from "./pages/Auth/Auth"; // if exists
import { Provider } from "react-redux";
import { ThemeProvider } from "../src/context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />, // Homepage
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order",
        element: (
          // <ProtectedRoute>
          <Order />
          // </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
