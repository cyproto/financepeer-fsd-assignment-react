import { Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/" />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/signup", element: <Signup /> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <Login /> : <Navigate to="/dashboard" />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Navigate to="/" /> },
    ],
  },
];

export default routes;
