import React, { createContext, useEffect, useState } from "react";
import { useTechRol } from "../hooks/useTechRol";

const currentUser = {
  token: "",
  email: "",
  firstname: "",
  lastname: "",
  about_me: "",
  age: "",
  article_1: "",
  avatar: "",
  id: "",
  country: "",
  region: "",
  phone: "",
  url_portfolio: "",
  isRecruiter: false,
  isFreelancer: false,
};

export const UserContext = createContext(currentUser);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    token: "",
    email: "",
    firstname: "",
    lastname: "",
    about_me: "",
    age: "",
    article_1: "",
    avatar: "",
    id: "",
    country: "",
    region: "",
    phone: "",
    url_portfolio: "",
    isRecruiter: false,
    isFreelancer: false,
  });

  //Route
  const [path, setPath] = useState(0);

  const [jobs, setJobs] = useState([]);
  const [selectedRol, setselectedRol] = useState(null);
  const [selectedStack, setSelectedStack] = useState([]);
  const [data, setData] = useState();

  function getInfo() {
    fetch("https://node-server-navy-rho.vercel.app/jobs/")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  }

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const getRol = async () => {
      const response = await useTechRol();
      setData(response.map((res) => res));
    };
    getRol();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    jobs,
    setJobs,
    selectedRol,
    setselectedRol,
    selectedStack,
    setSelectedStack,
    data,
    setData,
    path,
    setPath,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
