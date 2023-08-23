import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../api";
import { AuthContext } from "../../App";

export const useProtectedPage = () => {
  const { jwtCookie, setJwtCookie } = useContext(AuthContext);
  const navigate = useNavigate();
  const getAuthId = async () => {
    try {
      const user = await getUserId(jwtCookie).then((res) => res.data.user);
      console.log(user);
    } catch (error) {
      setJwtCookie(null);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!jwtCookie) {
      navigate("/login");
    } else {
      getAuthId();
    }
  }, [jwtCookie]);
};
