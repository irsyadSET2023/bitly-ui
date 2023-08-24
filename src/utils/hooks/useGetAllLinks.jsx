import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { getAllLinks } from "../api";

const useGetAllLinks = (deps = []) => {
  const { jwtCookie } = useContext(AuthContext);
  const [fetchDataState, setFetchDataState] = useState("pending");
  const [dataState, setDataState] = useState([]);

  const fetchLinks = async () => {
    try {
      setFetchDataState("loading");
      const data = await getAllLinks(jwtCookie);
      console.log(data?.data?.data);
      const realData = data?.data?.data;
      setDataState(realData);
      console.log("Data:", dataState);
      setFetchDataState("success");
    } catch (error) {
      console.log(error);
      setFetchDataState("Error");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [...deps]);

  return {
    fetchDataState,
    setFetchDataState,
    dataState,
    jwtCookie,
    fetchLinks,
  };
};

export default useGetAllLinks;
