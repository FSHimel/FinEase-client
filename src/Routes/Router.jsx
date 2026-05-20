import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import PrivetRoute from "./PrivetRoute";
import AddTransaction from "../Pages/AddTransaction";
import MyTransactions from "../Pages/MyTransactions";
import Reports from "../Pages/Reports";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "signup",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "add-transaction",
        element: (
          <PrivetRoute>
            <AddTransaction></AddTransaction>
          </PrivetRoute>
        ),
      },
      {
        path: "my-transactions",
        element: (
          <PrivetRoute>
            <MyTransactions></MyTransactions>
          </PrivetRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <PrivetRoute>
            <Reports></Reports>
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
