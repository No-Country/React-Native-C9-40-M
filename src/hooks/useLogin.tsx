import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;

export const useLogin = (data: LoginProps) => {
  const newData = { ...data, email: data.email.toLocaleLowerCase() };
  const fetchUsers = async (data: LoginProps) => {
    const response = await globalThis.fetch(`${URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const a = await response.json();
    return a;
  };

  const respuesta = fetchUsers(newData);
  return respuesta;
};
