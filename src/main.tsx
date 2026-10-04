import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContext } from "@/hooks/use-auth";
import { router } from "@/router";
import "./styles.css";

const queryClient = new QueryClient();

// Demo auth: a fixed user who is a member of two of the three seeded lists.
const demoAuth = {
  user: { id: "u-ana", name: "Ana Okafor", listIds: ["list-groceries", "list-work"] },
  isAuthenticated: true,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContext.Provider value={demoAuth}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContext.Provider>
  </StrictMode>,
);
