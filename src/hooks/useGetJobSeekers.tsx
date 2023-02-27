import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;
// `${URL}/users/${id]`,

export const useGetUserbyId = async (id) => {
  try {
    const response = await globalThis.fetch(`${URL}users/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const a = await response.json();
    return await response.json();
  } catch (error) {
    console.log("hay un error");
  }
};

export const useGetJobSeekers = async (page = 0, status = "user") => {
  const fetchAllUsers = async () => {
    try {
      const response = await globalThis.fetch(
        `${URL}users/all?page=${page}&size=6&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log("hay un error");
    }
  };

  const allUsers = await fetchAllUsers();

  return allUsers.users;
};
