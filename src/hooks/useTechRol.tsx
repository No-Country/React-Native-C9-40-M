export const useTechRol = () => {
    const fetchRol = async () => {
      const response = await globalThis.fetch(
        "https://backapijobs-production-ad45.up.railway.app/api/v1/rol",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const a = await response.json();
      return a;
    };
  
    const respuesta = fetchRol();
    return respuesta;
  };
  