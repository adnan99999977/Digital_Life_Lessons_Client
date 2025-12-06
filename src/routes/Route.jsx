import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../components/Home";
import { createBrowserRouter } from "react-router-dom";
import PublicLessons from "../pages/PublicLessons";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../components/shared/ErroPage";
import DashboardHome from "../AdminDashboardComponents/DashboardHome";
import Profile from "../pages/clientDashboradPages/Profile";
import AddLesson from "../pages/clientDashboradPages/AddLesson";
import MyLessons from "../pages/clientDashboradPages/MyLessons";
import Pricing from "../pages/clientDashboradPages/Pricing";


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
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardHome /> }, 
      { path: "profile", element: <Profile /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "pricing", element: <Pricing /> },
    ],
  },
]);

export default router;
