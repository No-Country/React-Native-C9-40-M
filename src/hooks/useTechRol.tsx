import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;
export const useTechRol = () => {
  const fetchRol = async () => {
    try {
      const response = await globalThis.fetch(`${URL}rol`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.log("hay un error...", error);
    }
  };

  const respuesta = fetchRol();
  return respuesta;
};
