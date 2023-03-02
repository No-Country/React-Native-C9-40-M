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
    // esto se hizo para que los programas no reviente por el cambio de la estructura del user_rols
    if (a.user?.user_rols.length > 0) {
      const newUserRols = [
        {
          rol_id: a.user.user_rols[0].rol_id,
          name: a.user.user_rols[0].rol.name,
        },
      ];
      const newUser = { ...a.user, user_rols: newUserRols };
      return { token: a.token, user: newUser };
    } else {
      return a;
    }
  };

  const respuesta = fetchUsers(newData);
  return respuesta;
};
