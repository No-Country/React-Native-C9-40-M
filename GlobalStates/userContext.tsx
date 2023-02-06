import React, { createContext, useState } from 'react';

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

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
