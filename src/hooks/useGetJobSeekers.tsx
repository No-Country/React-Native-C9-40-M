const URL = "https://backapijobs-production-ad45.up.railway.app/api/v1/";
// `${URL}/users/${id]`,

export const useGetUserbyId = async (id) => {
  try {
    const response = await globalThis.fetch(`${URL}users/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log("hay un error");
  }
};

export const useGetJobSeekers = async () => {
  const fetchAllUsers = async () => {
    try {
      const response = await globalThis.fetch(`${URL}users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.log("hay un error");
    }
  };

  const allUsers = await fetchAllUsers();
  const jobSeekers = allUsers.filter((user) => user.status === "user");

  const fullDataJobSeeker = jobSeekers.map((user) => {
    // console.log(user.id);
  });

  return allUsers;
};
