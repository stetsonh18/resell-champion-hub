import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Landing from "@/pages/Landing";
import Profile from "@/pages/Profile";
import Categories from "@/pages/Categories";
import Expenses from "@/pages/Expenses";
import Stores from "@/pages/Stores";
import Platforms from "@/pages/Platforms";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export const protectedRoutes: RouteObject[] = [
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shipments",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "/returns",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "/platforms",
    element: (
      <ProtectedRoute>
        <Platforms />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stores",
    element: (
      <ProtectedRoute>
        <Stores />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories",
    element: (
      <ProtectedRoute>
        <Categories />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expenses",
    element: (
      <ProtectedRoute>
        <Expenses />
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
];