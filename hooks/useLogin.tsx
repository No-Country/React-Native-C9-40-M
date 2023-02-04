export const useLogin = (data: LoginProps) => {
  const fetchUsers = async (data: LoginProps) => {
    const response = await globalThis.fetch(
      'https://node-server-navy-rho.vercel.app/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const a = await response.json();
    return a;
  };

  const respuesta = fetchUsers(data);
  return respuesta;
};
