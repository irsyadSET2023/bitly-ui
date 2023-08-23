import React, { useContext } from "react";
import Header from "../components/Header";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const NAV = [
  {
    link: "/dashboard",
    text: "Dashboard",
  },
  {
    link: "/links",
    text: "Links",
  },
];

const DashboardLayout = ({ children }) => {
  const { setJwtCookie } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setJwtCookie(null);
    navigate("/login");
  };
  useProtectedPage();

  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <>
      <div className="flex w-screen min-h-screen">
        <div className="w-[300px] bg-pink-800 p-2 space-y-4">
          <h2 className="text-3xl text-white font-bold p-2">Bitly</h2>
          <div>
            {NAV.map((link, index) => {
              return (
                <Link
                  className="block p-2 text-white hover:bg-white/10 cursor-pointer"
                  key={index}
                  to={link.link}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
          <button className="p-2 bg-white" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
