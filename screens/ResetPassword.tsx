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
    password: yup.string().required('Debe de indicar la clave'),
    pwdConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Las claves no coinciden')
      .required('Obligatorio'),
  })
  .required();
type Props = {};
export const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: '',
      password: '',
      pwdConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  const handleReset = () => {
    console.warn('Se reseteo el password');
    navigation.navigate('Login');
  };
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Reset Password</Text>
        <CustomInput
          name="code"
          control={control}
          placeholder="codigo de confirmación"
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="password"
          secureTextEntry
        />
        <CustomInput
          name="pwdConfirm"
          control={control}
          placeholder="Confirmar clave"
          secureTextEntry
        />
        <CustomButton onPress={handleSubmit(handleReset)} text="Reset" />
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
