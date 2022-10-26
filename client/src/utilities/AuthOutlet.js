import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthOutlet = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    console.log(auth);
  }, []);
  console.log(auth);

  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
