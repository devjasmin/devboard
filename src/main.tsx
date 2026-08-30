import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.tsx";
import "./index.css";
import { ProfilProvider } from "./pages/context/ProfileContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProfilProvider>
      <RouterProvider router={router} />
    </ProfilProvider>
  </StrictMode>,
);
