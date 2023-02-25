export const useLogin = (data: LoginProps) => {
  const newData = { ...data, email: data.email.toLocaleLowerCase() };
  const fetchUsers = async (data: LoginProps) => {
    const response = await globalThis.fetch(
      "https://backapijobs-production-ad45.up.railway.app/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const a = await response.json();
    return a;
  };

  const respuesta = fetchUsers(newData);
  return respuesta;
};
