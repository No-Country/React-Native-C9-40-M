import React, { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [jobs, setJobs] = useState([]);

    function getInfo() {
        fetch("https://node-server-navy-rho.vercel.app/jobs/")
          .then((res) => res.json())
          .then((data) => setJobs(data.jobs));
      }

      useEffect(() => {
       getInfo()
      }, []);

  return (
    <DataContext.Provider value={{ jobs, setJobs}}>
      {children}
    </DataContext.Provider>
  );
}