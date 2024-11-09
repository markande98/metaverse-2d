import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForms from "./features/auth/auth-form";
import AuthProvider from "./features/auth/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProfile } from "./features/dashboard/user-profile";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthForms />,
  },
  {
    path: "/",
    element: <UserProfile />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
