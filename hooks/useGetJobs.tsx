import { useEffect, useState } from 'react';
export const useGetJobs = () => {
  const [jobsOfferts, setJobsOfferts] = useState([]);

  const fetchJobs = async () => {
    const response = await globalThis.fetch(
      'https://backapijobs-production-ad45.up.railway.app/api/v1/jobs?page=0&size=5'
    );
    const a = await response.json();
    setJobsOfferts(a.jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return jobsOfferts;
};
