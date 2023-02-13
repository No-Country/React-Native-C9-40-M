import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';
import { COLORS } from '../constants';

type Direction = {
  direction: 'next' | 'prev';
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const FirstScreen = ({ step, handleGoTo }: Props) => {
  const handleNext = () => {
    console.log('Validar datos antes de pasar  la siguiente pantalla');
    handleGoTo('next');
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Cuentanos de tí</Text>
        <Text style={styles.subtitle}>
          Esta Pantalla se capturan los datos basicos del usuario
        </Text>
        <Text style={styles.subtitle}>Desarrollandose por Yuliana</Text>
      </View>

      <Text style={styles.title}>Pantalla en el paso {step}</Text>

      <View style={styles.row}>
        <View style={{ width: 50 }}>
          <CustomButton
            onPress={handleNext}
            text=""
            icon="arrow-circle-right"
            bgColor={COLORS.logoGold}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: '700',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
