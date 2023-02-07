export const useRegister = (user: RegisterProps) => {
  const newUser = {
    ...user,
    firstname: null,
    lastname: null,
    phone: null,
  };
  const fetchUsers = async (data: RegisterProps) => {
    const response = await globalThis.fetch(
      'https://node-server-navy-rho.vercel.app/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      }
    );
    const a = await response.json();
    return a;
  };

  const respuesta = fetchUsers(newUser);
  return respuesta;
};
