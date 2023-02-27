import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirstScreen } from "../../components/pages/profile/user/FirstScreen";
import { SecondScreen } from "../../components/pages/profile/user/SecondScreen";
import { ThirdScreen } from "../../components/pages/profile/user/ThirdScreen";
import { FourScreen } from "../../components/pages/profile/user/FourScreen";
import { FiveScreen } from "../../components/pages/profile/FiveScreen";
import { FirstRecruiter } from "../../components/pages/profile/Recruiter/FirstRecruiter";
import { SecondRecruiter } from "../../components/pages/profile/Recruiter/RecluiterLogin/SecondRecruiter";
import { UserContext } from "../../GlobalStates/userContext";

type Props = {};

type Direction = {
  direction: "next" | "prev" | "next1";
};

export const ProfileAdd = (props: Props) => {
  const { path } = useContext(UserContext);

  const [step, setStep] = useState(1);

  const handleGoTo = (direction: Direction) => {
    const prevScreen = Math.max(step - 1, 1);
    const nextScreen = Math.min(step + 1, 5);
    direction === "next"
      ? setStep(nextScreen)
      : direction === "next1"
      ? setStep(step + 2)
      : setStep(prevScreen);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {step === 1 && (
          <React.Fragment>
            {path === 2 ? (
              <FirstScreen step={step} handleGoTo={handleGoTo} />
            ) : (
              <FirstScreen step={step} handleGoTo={handleGoTo} />
            )}
          </React.Fragment>
        )}
        {step === 2 && (
          <React.Fragment>
            {path === 2 ? (
              <SecondScreen step={step} handleGoTo={handleGoTo} />
            ) : (
              <FirstRecruiter step={step} handleGoTo={handleGoTo} />
            )}
          </React.Fragment>
        )}
        {step === 3 && (
          <React.Fragment>
            {path === 2 ? (
              <ThirdScreen step={step} handleGoTo={handleGoTo} />
            ) : (
              <SecondRecruiter step={step} handleGoTo={handleGoTo} />
            )}
          </React.Fragment>
        )}
        {step === 4 && <FourScreen step={step} handleGoTo={handleGoTo} />}
        {step === 5 && <FiveScreen />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    flex: 1,
  },
});
