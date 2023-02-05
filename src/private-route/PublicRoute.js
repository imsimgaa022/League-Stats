import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("accessToken");

  useEffect(() => {
    if (isLoggedIn) {
      navigate({
        pathname: "/home",
        state: { from: location },
      });
    }
  }, [navigate, isLoggedIn, location]);

  return !isLoggedIn ? children : null;
};

export default PublicRoute;
