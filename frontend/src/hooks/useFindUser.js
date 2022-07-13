import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getUserDetails } from "../api/services";

export default function useFindUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["session"]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      let sessionToken = cookies.session;
      if (sessionToken) {
        //verify token and set the current user
        try {
          const response = await getUserDetails(sessionToken);
          const { user } = response.data;
          setUser(user);
          setIsLoading(false);
          if (location.pathname === "/") navigate("/projects");
          else navigate(location.pathname);
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        console.log("no session token found");
        setUser(null);
      }
      setIsLoading(false);
    }
    findUser();
  }, [cookies.session, location.pathname, navigate]);

  return {
    user,
    setUser,
    isLoading,
  };
}
