import React, { createContext, useEffect, useState } from "react";
import { useTechRol } from "../hooks/useTechRol";

const initialUser = {
  token: null,
  about_me: null,
  age: null,
  article_1: null,
  avatar: null,
  country: null,
  email: null,
  firstname: null,
  id: null,
  is_verify: false,
  lastname: null,
  phone: null,
  projects: [],
  region: null,
  repositories: [],
  status: null,
  url_github: null,
  url_linkedin: null,
  user_rols: [],
  user_tecnologies: [],
  isFreelancer: false,
};

const initialJob = [
  {
    id: 0,
    title: "Developer Front-End",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://www.simplilearn.com/ice9/free_resources_article_thumb/tester-or-developer-what-suits-you-the-most.jpg",
    user_id: 1,
    user: {
      firstname: "José",
      lastname: "Riga",
      email: "joseriga12@gmail.com",
    },
    country: "Uruguay",
    work_place: "Remote",
    working_day: "Part-time",
    company_id: null,
    company: [
      {
        id: 2,
        user_id: 2,
        name: "Consultors IT",
        country: "Argentina",
        city: "CABA",
        phone: "1564888466",
        email: "crismarcompany@gmail.com",
        adress: "Saavedra 451",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        website: "https://www.adecoagro.com/",
        verified: false,
      },
    ],
    post_date: "2023-02-26T22:37:54.103Z",
    jobs_rols: [
      {
        rol_id: 1,
        rol: {
          name: "Developer Back.End",
        },
      },
    ],
    jobs_tecnologies: [
      {
        tecnology_id: 1,
        years_tecnology: 1,
        tecnology: {
          name: "java",
        },
      },
    ],
    salaries: [
      {
        price: 400,
      },
    ],
  },
];

export const UserContext = createContext(initialUser);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);

  //Route
  const [path, setPath] = useState(0);

  //Variables de selección
  const [jobs, setJobs] = useState([]);
  const [selectedRol, setselectedRol] = useState(null);
  const [selectedStack, setSelectedStack] = useState([]);
  const [experience, setExperience] = useState(0);
  const [description, setDescription] = useState();
  const [data, setData] = useState();

  function getInfo() {
    fetch("https://node-server-navy-rho.vercel.app/jobs/")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  }

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const getRol = async () => {
      const response = await useTechRol();
      setData(response.map((res) => res));
    };
    getRol();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    jobs,
    setJobs,
    selectedRol,
    setselectedRol,
    selectedStack,
    setSelectedStack,
    data,
    setData,
    path,
    setPath,
    experience,
    setExperience,
    description,
    setDescription,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
