export const useGetJobSeekers = () => {
  // const fetchAllUsers = async () => {
  //   try {
  //     const response = await globalThis.fetch(
  //       "https://backapijobs-production-ad45.up.railway.app/api/v1/jobs?page=0&size=5"
  //     );
  //     const a = await response.json();
  //     return a.jobs;
  //   } catch (error) {
  //     console.log("hay un error");
  //   }
  // };
  // const a = await fetchJobs();

  const allUsers = [
    {
      id: 1,
      firstname: "José",
      lastname: "Riga",
      email: "joseriga12@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      url_linkedin: "linkedin.com/in/Jose-Riga",
      url_github: "https://www.github.com/JoseRiga",
      country: "Argentina",
      region: "Buenos Aires",
      phone: null,
      rol: {
        rol_id: 1,
        rol: { name: "Developer Back.End" },
        user_tecnologies: [{ tecnology_id: 1, name: "java" }],
      },
    },
    {
      id: 3,
      firstname: "Dario",
      lastname: "Martinez",
      email: "martinez45@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      url_linkedin: "linkedin.com/in/Dario-Mar",
      url_github: "https://www.github.com/Dario",
      country: "Colombia",
      region: "Bogota",
      phone: null,
      rol: {
        rol_id: 1,
        rol: { name: "Developer Back.End" },
        user_tecnologies: [
          { tecnology_id: 1, name: "java" },
          { tecnology_id: 3, name: "react" },
        ],
      },
    },
    {
      id: 4,
      firstname: "Diego",
      lastname: "Diaz",
      email: "diaz69@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      url_linkedin: "linkedin.com/in/Diego",
      url_github: "https://www.github.com/Diego",
      country: "Ecuador",
      region: "Quito",
      phone: null,
      rol: {
        rol_id: 1,
        rol: { name: "Developer Back.End" },
        user_tecnologies: [
          { tecnology_id: 1, name: "java" },
          { tecnology_id: 5, name: "node js" },
          { tecnology_id: 8, name: "c#" },
        ],
      },
    },
    {
      id: 22,
      firstname: "Mayra",
      lastname: "Fernandez",
      email: "mayrabfernandez2@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      url_linkedin: "linkedin.com/in/mayra",
      url_github: "https://www.github.com/mayra",
      country: "Argentina",
      region: "Buenos Aires",
      phone: "0529632",
    },
    {
      id: 25,
      firstname: "Juan",
      lastname: "Perez",
      email: "juan@correo.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      url_linkedin: "linkedin.com/in/perezjuan",
      url_github: "https://www.github.com/juanpere",
      country: "Colombia",
      region: "Medellin",
      phone: "",
      rol: {
        rol_id: 2,
        rol: { name: "Front-End" },
        user_tecnologies: [
          { tecnology_id: 5, name: "react native" },
          { tecnology_id: 1, name: "node js" },
          { tecnology_id: 10, name: "PHP" },
        ],
      },
    },
    {
      id: 9,
      firstname: "Maria",
      lastname: "Martinez",
      email: "maria@correo.co",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
      url_linkedin: "linkedin.com/in/maria",
      url_github: "https://www.github.com/maria",
      country: "Venezuela",
      region: "Miranda",
      phone: "1234567",
      rol: {
        rol_id: 3,
        rol: { name: "Diseñador UX/UI" },
        user_tecnologies: [
          { tecnology_id: 3, name: "react" },
          { tecnology_id: 10, name: "PHP" },
        ],
      },
    },
    {
      id: 19,
      firstname: "Yuliana",
      lastname: "Boglione",
      email: "yulyana77@hotmail.com",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      url_linkedin: "linkedin.com/in/yuliana",
      url_github: "https://www.github.com/yuliana",
      country: "Argentina",
      region: "Buenos Aires",
      phone: "00996633",
      rol: {
        rol_id: 2,
        rol: { name: "Front-End" },
        user_tecnologies: [
          { tecnology_id: 5, name: "react native" },
          { tecnology_id: 1, name: "node js" },
          { tecnology_id: 10, name: "PHP" },
        ],
      },
    },
    {
      id: 20,
      firstname: "Crismar",
      lastname: "Silva",
      email: "crisilvalla@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      url_linkedin: "linkedin.com/in/crismar-silva/",
      url_github: null,
      country: "Argentina",
      region: "Buenos Aires",
      phone: "12345",
      rol: {
        rol_id: 3,
        rol: { name: "Diseñador UX/UI" },
        user_tecnologies: [
          { tecnology_id: 3, name: "react" },
          { tecnology_id: 10, name: "PHP" },
        ],
      },
    },
  ];
  return allUsers;
};
