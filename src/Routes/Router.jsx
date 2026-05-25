import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import PrivetRoute from "./PrivetRoute";
import AddTransaction from "../Pages/AddTransaction";
import MyTransactions from "../Pages/MyTransactions";
import Reports from "../Pages/Reports";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error";
import MyProfile from "../Pages/MyProfile";
import ViewDetails from "../Pages/ViewDetails";
import Terms from "../Pages/Terms";
import Privacy from "../Pages/Privacy";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error></Error>,
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
        path: "terms&condition",
        Component: Terms,
      },
      {
        path: "privacy",
        Component: Privacy,
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
        path: "profile",
        element: (
          <PrivetRoute>
            <MyProfile></MyProfile>
          </PrivetRoute>
        ),
      },
      {
        path: "details/:id",
        loader: async () => {
          const res = await fetch(
            "https://fin-ease-server-pi.vercel.app/transactions",
          );
          return res.json();
        },
        element: (
          <PrivetRoute>
            <ViewDetails></ViewDetails>
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
