import { REACT_APP_URL } from "@env";
const URL = process.env.REACT_APP_URL;

type UpdateUserProps = {
  firstname?: string;
  lastname?: string;
  about_me?: string;
  age?: string;
  article_1?: string;
  avatar?: string;
  id?: string;
  country?: string;
  region?: string;
  phone?: string;
  url_git?: string; // url de linkedIn
  linkedInUrl?: string; // url_portfolio
  gitUrl?: string;
  fileCV?: string;
  rol?: string;
  tecnologies?: string[];
  token: string;
};

export const useUpdateUser = async (userData: UpdateUserProps) => {
  try {
    const response = await globalThis.fetch(`${URL}users"`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(userData),
    });
    const a = await response.json();
    return "ok";
  } catch (error) {
    console.log("hay un error");
  }
};
