import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;

export const useGetJobs = async () => {
  const fetchJobs = async () => {
    try {
      const response = await globalThis.fetch(`${URL}jobs?page=0&size=25`);
      const a = await response.json();
      return a.jobs;
    } catch (error) {
      console.log("hay un error");
    }
  };
  const a = await fetchJobs();
  return a;
};
