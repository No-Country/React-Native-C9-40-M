export const useRegister = (user: RegisterProps) => {
  const fetchUsers = async (data: RegisterProps) => {
    const response = await globalThis.fetch(
      'https://backapijobs-production-ad45.up.railway.app/api/v1/auth/register',
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

  const respuesta = fetchUsers(user);
  return respuesta;
};
