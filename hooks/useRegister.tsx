export const useRegister = (data: RegisterProps) => {
  const fetchUsers = async (data: RegisterProps) => {
    const response = await globalThis.fetch(
      'https://node-server-navy-rho.vercel.app/auth/register',
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
