import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) navigate("/dashboard");
  }, [auth, navigate]);

  return <Outlet />;
};

export default Layout;
