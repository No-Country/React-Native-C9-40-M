// Hook utilizado para que un usuario se postule a un trabajo

import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;

type ApplicationJobProps = {
  job_id: number;
  token: string;
};

export const useJobAplication = async (aplicationData: ApplicationJobProps) => {
  try {
    const response = await globalThis.fetch(
      `${URL}postulation/user/job/${aplicationData.job_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aplicationData.token}`,
        },
      }
    );
    const a = await response.json();
    return "ok";
  } catch (error) {
    console.log("hay un error", error);
  }
};
