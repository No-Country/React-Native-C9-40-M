import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;

export const useGetApplicationJobs = async (token) => {
  try {
    const response = await globalThis.fetch(
      `${URL}postulation/user?page=0&size=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const a = await response.json();
    return a.Postulation_job;
  } catch (error) {
    console.log("hay un error", error);
  }
};
