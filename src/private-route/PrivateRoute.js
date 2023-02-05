import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({
        pathname: "/",
        state: { from: location },
      });
    }
  }, [navigate, isLoggedIn, location]);

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
