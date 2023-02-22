import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirstStep } from "../../components/jobPostSteps/FirstStep";

type Props = {};

const initialCurrentJobPost: CurrentJobPost = {
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
  job_work_place: "",
  job_working_day: "",
};

type Direction = {
  direction: "next" | "prev";
};

export const JobPost = (props: Props) => {
  const [step, setStep] = useState(1);
  const [jobPost, setJobPost] = useState(initialCurrentJobPost);

  const handleGoTo = (direction: Direction) => {
    const prevScreen = Math.max(step - 1, 1);
    const nextScreen = Math.min(step + 1, 5);
    direction === "next" ? setStep(nextScreen) : setStep(prevScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {step === 1 && (
          <FirstStep
            step={step}
            jobPost={jobPost}
            setJobPost={setJobPost}
            handleGoTo={handleGoTo}
          />
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
