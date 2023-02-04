import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../assets/images/logo.png';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';

const schema = yup
  .object({
    code: yup.string().required('Requerido'),
  })
  .required();

type Props = {};
export const ConfirmEmailScreen = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: '',
    },
    resolver: yupResolver(schema),
  });
  const handleConfirm = () => {
    console.warn('Se confirmo el Correo');
    navigation.navigate('Home');
  };
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  const onResendCode = () => {
    console.warn('Se reenvio el codigo de confirmación');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Confirmar el Correo</Text>
        <CustomInput
          name="code"
          control={control}
          placeholder="Codigo de confirmación"
        />
        <CustomButton onPress={handleSubmit(handleConfirm)} text="Confirmar" />

        <CustomButton
          onPress={onResendCode}
          text="Reenviar codigo"
          type="Secondary"
        />

        <CustomButton
          onPress={goToLogin}
          text="Regresar a Login"
          type={'Link'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    maxWidth: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginBottom: 50,
  },
});
