import { useCookies } from "react-cookie";
import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);
function App() {
  const [jwt, setJwt] = useState(null);
  const [cookies, setCookies] = useCookies(["jwt"]);

  const setJwtCookie = (jwt) => setCookies("jwt", jwt);
  useEffect(() => {
    if (jwt) {
      setCookies("jwt", jwt);
    }
  }, [jwt]);

  useEffect(() => {
    if (cookies?.jwt) {
      setJwt(cookies.jwt);
    }
  }, [cookies?.jwt]);

  return (
    <AuthContext.Provider value={{ jwt, setJwt, setJwtCookie }}>
      <Routes />
    </AuthContext.Provider>
  );
}

AuthContext.displayName = "AuthContext";

export default App;
