import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../components/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // root layout
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, 
        element:<Home/> 
       }
    ],
  },

  // dashboard layout
  {
    path: "dashboard",
    element: <DashboardLayout />,
  },
]);

export default router;
