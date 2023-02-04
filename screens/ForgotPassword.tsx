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
    email: yup
      .string()
      .email('Email invalido')
      .required('Debe de indicar su e-mail'),
  })
  .required();

type Props = {};
export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const handleSendEmail = (data) => {
    console.warn('Se envio un correo');
    navigation.navigate('ResetPassword');
  };
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>¿Olvidó su Password?</Text>
        <CustomInput name="email" control={control} placeholder="email" />
        <CustomButton onPress={handleSubmit(handleSendEmail)} text="Enviar" />
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
