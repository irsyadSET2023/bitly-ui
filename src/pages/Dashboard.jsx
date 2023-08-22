import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/api";
import Header from "../components/Header";

const Dashboard = () => {
  const { jwt, setJwt, setJwtCookie } = useContext(AuthContext);
  const navigate = useNavigate();
  const getAuthId = async () => {
    try {
      const user = await getUserId(jwt).then((res) => res.data.user);
      console.log(user);
    } catch (error) {
      setJwt(null);
      setJwtCookie(null);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    } else {
      getAuthId();
    }
  }, [jwt]);
  return (
    <>
      <Header />
      <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-pink-800">
        <h1 className="text-white text-5xl">Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
