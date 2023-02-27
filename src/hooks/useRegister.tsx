import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;
export const useRegister = (user: RegisterProps) => {
  const newUser = { ...user, email: user.email.toLowerCase() };
  const fetchUsers = async (data: RegisterProps) => {
    const response = await globalThis.fetch(`${URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const a = await response.json();
    return a;
  };

  const respuesta = fetchUsers(newUser);
  return respuesta;
};
