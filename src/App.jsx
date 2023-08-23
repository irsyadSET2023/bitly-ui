import { useCookies } from "react-cookie";
import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);
function App() {
  const [cookies, setCookies] = useCookies(["jwt"]);
  const jwtCookie = cookies?.jwt;
  const setJwtCookie = (jwt) => setCookies("jwt", jwt);

  return (
    <AuthContext.Provider value={{ jwtCookie, setJwtCookie }}>
      <Routes />
    </AuthContext.Provider>
  );
}

AuthContext.displayName = "AuthContext";

export default App;
