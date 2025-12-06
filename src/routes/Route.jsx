import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../components/Home";
import { createBrowserRouter } from "react-router-dom";
import PublicLessons from "../pages/PublicLessons";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardHome from "../ClientDashboardComponents/DashboardHome";
import Profile from "../pages/clientDashboradPages/Profile";
import ErrorPage from "../components/shared/ErroPage";

const router = createBrowserRouter([
  // root layout
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage/>,
    children: [
      { index: true, element: <Home /> },
      { path: "public-lessons", element: <PublicLessons /> },
      { path: "log-in", element: <Login /> },
      { path: "register", element: <Register /> },
     
    ],
  },

  // dashboard layout
  {
    path: "dashboard",
    errorElement:<ErrorPage/>,
    element: <DashboardLayout />,
    children: [{ index: true, element: <DashboardHome/> },
       { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
