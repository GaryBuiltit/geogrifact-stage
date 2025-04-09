import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "@/index.css";
import App from "@/App.jsx";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { ProjectProvider } from "@/contexts/ProjectContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.log("Missing Publishable Key");
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <SidebarProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </SidebarProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
