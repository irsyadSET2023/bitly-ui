import React, { useContext, useState } from "react";

const Header = () => {
  return (
    <header className="h-[80px] w-screen flex justify-between items-center px-6 bg-red-700 sticky top-0 z-50">
      <h3 className="text-2xl font-bold text-white">Logo</h3>
      <div>
        <button className="bg-white">Logout</button>
      </div>
    </header>
  );
};

export default Header;
