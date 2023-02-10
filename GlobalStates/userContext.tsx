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
    email: '',
    firstname: '',
    lastname: '',
    token: '',
  });

  const [jobs, setJobs] = useState([]);

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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
