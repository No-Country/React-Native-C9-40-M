import { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../assets/images/logo.png';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import SocialLoging from '../components/SocialLoging';

import { useLogin } from '../hooks/useLogin';
import { UserContext } from '../GlobalStates/userContext';

const schema = yup
  .object({
    email: yup.string().email('Email invalido').required('Requerido'),
    password: yup.string().required('Debe de indicar la clave'),
  })
  .required();

type FormValues = {
  password: string;
  email: string;
};

export const LoginScreen = () => {
  const { setCurrentUser } = useContext(UserContext);

  const [loginRes, setLoginRes] = useState('');
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: FormValues) => {
    const loginResult = await useLogin(data);
    if (loginResult.success) {
      setCurrentUser({
        email: loginResult.email,
        firstname: loginResult.firstname,
        lastname: loginResult.lastname,
        token: loginResult.token,
      });
      navigation.navigate('Home');
    } else {
      setLoginRes(loginResult.msg);
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>INGRESAR</Text>

        {loginRes && (
          <View style={styles.errorMsg}>
            <Text style={styles.errorText}> {loginRes}</Text>
          </View>
        )}

        <CustomInput name="email" control={control} placeholder="email" />
        <CustomInput
          name="password"
          control={control}
          placeholder="password"
          secureTextEntry
        />

        <CustomButton onPress={handleSubmit(handleLogin)} text="Aceptar" />

        <CustomButton
          onPress={goToForgotPassword}
          text="¿Olvidó su clave de acceso?"
          type="Link"
        />

        <SocialLoging />

        <Text style={styles.text}>
          ¿No tiene cuenta?{' '}
          <Text onPress={goToRegister} style={styles.link}>
            Afiliese aquí
          </Text>
        </Text>
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
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
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
  errorMsg: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  errorText: {
    color: 'white',
    padding: 5,
  },
});
