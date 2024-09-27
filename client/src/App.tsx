import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Auth";
import { GamesPage } from "./pages/Games";
import { NotFound } from "./pages/NotFound";
import { PrivateRoute } from "./components/PrivateRoute";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/games" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/games"
        element={
          <PrivateRoute>
            <GamesPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
