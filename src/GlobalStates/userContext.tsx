import React, { createContext, useEffect, useState } from "react";
import { useTechRol } from "../hooks/useTechRol";

const initialUser = {
  token: null,
  about_me: null,
  age: null,
  article_1: null,
  avatar: null,
  country: null,
  email: null,
  firstname: null,
  id: null,
  is_verify: false,
  lastname: null,
  phone: null,
  projects: [],
  region: null,
  repositories: [],
  status: null,
  url_github: null,
  url_linkedin: null,

  user_rols: [],
  user_tecnologies: [],
  isFreelancer: false,
};

export const UserContext = createContext(initialUser);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);

  //Route
  const [path, setPath] = useState(0);

  //Variables de selección
  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState();
  const [selectedRol, setselectedRol] = useState(null);
  const [selectedStack, setSelectedStack] = useState([]);
  const [experience, setExperience] = useState(0);
  const [description, setDescription] = useState();

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
    experience,
    setExperience,
    description,
    setDescription,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
