import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { JobPostStep1 } from "../../components/pages/jobPostSteps/JobPostStep1";
import { JobPostStep2 } from "../../components/pages/jobPostSteps/JobPostStep2";
import { JobPostStep3 } from "../../components/pages/jobPostSteps/JobPostStep3";
import { JobPostStep4 } from "../../components/pages/jobPostSteps/JobPostStep4";
import { JobPostStep5 } from "../../components/pages/jobPostSteps/JobPostStep5";
import { useTechRol } from "../../hooks/useTechRol";

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
    const prevScreen = Math.max(step - 1, 0);
    const nextScreen = Math.min(step + 1, 5);
    direction === "next" ? setStep(nextScreen) : setStep(prevScreen);
  };

  return (
    <View style={styles.container}>
      {!isLoad ? (
        <Text>Cargando</Text>
      ) : (
        <>
          {step === 1 && (
            <JobPostStep1
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}
          {step === 2 && (
            <JobPostStep2
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}

          {step === 3 && (
            <JobPostStep3
              allRol={allRol}
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}
          {step === 4 && (
            <JobPostStep4
              rolTec={rolTec}
              jobPost={jobPost}
              setJobPost={setJobPost}
              handleGoTo={handleGoTo}
            />
          )}
          {step === 5 && (
            <JobPostStep5
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
