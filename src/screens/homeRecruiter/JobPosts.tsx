import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirstStep } from "../../components/jobPostSteps/FirstStep";
import { FourStep } from "../../components/jobPostSteps/FourStep";
import { SecondStep } from "../../components/jobPostSteps/SecondStep";
import { ThirdStep } from "../../components/jobPostSteps/ThirdStep";
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
      setAllRol(response.map((rol) => rol.name));
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
            value: tec.tecnology.name,
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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {!isLoad ? (
          <Text>Gargando</Text>
        ) : (
          <>
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
                rolTec={rolTec}
                jobPost={jobPost}
                setJobPost={setJobPost}
                handleGoTo={handleGoTo}
              />
            )}
            {step === 4 && <FourStep />}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    flex: 1,
  },
});
