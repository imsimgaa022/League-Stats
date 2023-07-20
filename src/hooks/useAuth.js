import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector((state) => state.token);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const decoded = jwt_decode(token);
          if (decoded?.user_id) {
            setUser(decoded.user_id);
          }
        } catch (error) {
          setUser(null)
          console.error('Error decoding token:', error);
        }
      } else {
        setUser(null)
      }
    };

    verifyToken();
  }, [token]);

  return !!user;
};

export default useAuth;
