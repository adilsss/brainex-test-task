import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactElement;
}

export const PrivateRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};
