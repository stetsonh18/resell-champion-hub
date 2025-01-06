import { Routes, Route } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "@/routes/routes";

export const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
};