import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Error404 from "../pages/Error404/Error404";
import NewGroup from "../pages/NewGroup/NewGroup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/error",
    element: <Error404 />,
  },
  {
    path: "/new",
    element: <NewGroup />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}
export default Router;
