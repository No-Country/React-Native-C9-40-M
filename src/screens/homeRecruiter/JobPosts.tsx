import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FirstStep } from "../../components/pages/jobPostSteps/FirstStep";
import { SecondStep } from "../../components/pages/jobPostSteps/SecondStep";
import { ThirdStep } from "../../components/pages/jobPostSteps/ThirdStep";
import { FourStep } from "../../components/pages/jobPostSteps/FourStep";
import { useTechRol } from "../../hooks/useTechRol";
import { ZeroStep } from "../../components/pages/jobPostSteps/ZeroStep";

type Props = {};

const initialJobPost: CurrentJobPost = {
  company_avatar: "",
  company_name: "",
  company_desc: "",
  company_url_linkedin: "",
  company_url_web: "",
  company_phone: "",
  job_offered: "",
  job_desc: "",
  job_requirements: [],
  job_country: "",
  job_region: "",
  job_work_place: "",
  job_working_day: "",
};

type Direction = {
  direction: "next" | "prev";
};

export const JobPost = (props: Props) => {
  const [jobPost, setJobPost] = useState(initialJobPost);
  const [allRolTec, setAllRolTec] = useState([]);
  const [allRol, setAllRol] = useState([]);
  const [rolTec, setRolTec] = useState([]);
  const [step, setStep] = useState(1);
  const [isLoad, setIsLoad] = useState(false);

  // Fetch all roles and tecnologies from database
  useEffect(() => {
    setIsLoad(false);
    const getRol = async () => {
      const response = await useTechRol();
      console.log("get Rol", response);
      setAllRolTec(response);
      setAllRol(
        response.map((rol) => {
          return { id: rol.id, name: rol.name };
        })
      );
      setIsLoad(true);
    };
    getRol();
  }, []);

  // Select tecnologies related with the rol selected
  useEffect(() => {
    const newRolTecn = jobPost.job_offered
      ? allRolTec
          .filter((rol) => rol.name === jobPost.job_offered)[0]
          .rol_tecnology.map((tec) => ({
            id: tec.tecnology_id,
            name: tec.tecnology.name,
          }))
      : [];
    setRolTec(newRolTecn);
  }, [jobPost.job_offered]);

  const handleGoTo = (direction: Direction) => {
    const prevScreen = Math.max(step - 1, 1);
    const nextScreen = Math.min(step + 1, 5);
    direction === "next" ? setStep(nextScreen) : setStep(prevScreen);
  };

  return (
    <View style={styles.container}>
      {!isLoad ? (
        <Text>Cargando</Text>
      ) : (
        <>
          {step === 0 && (
            <ZeroStep
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}
          {step === 1 && (
            <FirstStep
              allRol={allRol}
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}
          {step === 2 && (
            <SecondStep
              rolTec={rolTec}
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}
          {step === 3 && (
            <ThirdStep
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}
          {step === 4 && (
            <FourStep
              setStep={setStep}
              initialValues={initialJobPost}
              setJobPost={setJobPost}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
