import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FirstScreen } from '../../components/FirstScreen';
import { SecondScreen } from '../../components/SecondScreen';
import { ThirdScreen } from '../../components/ThirdScreen';
import { FourScreen } from '../../components/FourScreen';
import { FiveScreen } from '../../components/FiveScreen';
type Props = {};

type Direction = {
  direction: 'next' | 'prev';
};

export const ProfileAdd = (props: Props) => {
  const [step, setStep] = useState(1);

  const handleGoTo = (direction: Direction) => {
    const prevScreen = Math.max(step - 1, 1);
    const nextScreen = Math.min(step + 1, 5);
    direction === 'next' ? setStep(nextScreen) : setStep(prevScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {step === 1 && <FirstScreen step={step} handleGoTo={handleGoTo} />}
        {step === 2 && <SecondScreen step={step} handleGoTo={handleGoTo} />}
        {step === 3 && <ThirdScreen step={step} handleGoTo={handleGoTo} />}
        {step === 4 && <FourScreen step={step} handleGoTo={handleGoTo} />}
        {step === 5 && <FiveScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    flex: 1,
  },
});
