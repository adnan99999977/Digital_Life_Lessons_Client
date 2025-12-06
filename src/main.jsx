import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import router from "./routes/Route";
import AuthProvider from "./auth/AuthProvider";
import AppWrapper from "./loader/AppWrapperComponet";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppWrapper>
  </StrictMode>
);
