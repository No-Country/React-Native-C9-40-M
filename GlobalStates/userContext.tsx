import React, { createContext, useEffect, useState } from 'react';

const currentUser = {
  email: '',
  firstname: '',
  lastname: '',
  token: '',
};

export const UserContext = createContext(currentUser);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    token: '',
    email: '',
    firstname: '',
    lastname: '',
    about_me: '',
    age: '',
    article_1: '',
    avatar: '',
    id: '',
    country: '',
    region: '',
    phone: '',
    url_portfolio: '',
  });

  const [jobs, setJobs] = useState([]);
  const [selectedRol, setselectedRol] = useState(null);

  function getInfo() {
    fetch('https://node-server-navy-rho.vercel.app/jobs/')
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  }

  useEffect(() => {
    getInfo();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    jobs,
    setJobs,
    selectedRol,
    setselectedRol,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
