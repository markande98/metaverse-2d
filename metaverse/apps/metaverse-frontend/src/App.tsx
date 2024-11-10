import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForms from "./features/auth/auth-form";
import AuthProvider from "./features/auth/auth-provider";
import { Dashboard } from "./components/dashboard";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthForms />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;