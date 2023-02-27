import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;
export const useTechRol = () => {
  const fetchRol = async () => {
    const response = await globalThis.fetch(`${URL}rol"`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const a = await response.json();
    return a;
  };

  const respuesta = fetchRol();
  return respuesta;
};
