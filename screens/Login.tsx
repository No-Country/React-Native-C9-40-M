import { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../assets/images/logo.png';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
// import SocialLoging from '../components/SocialLoging';

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
        <Text style={styles.title}>
          <Text style={styles.bold}>¡ClipJobs</Text> te da la bienvenida!
        </Text>
        <Text style={styles.subtitle}>
          La manera más fácil para postularte a tu trabajo ideal
        </Text>
      </View>

      <View style={styles.formContainer}>
        {loginRes && (
          <View style={styles.errorMsg}>
            <Text style={styles.errorText}> {loginRes}</Text>
          </View>
        )}
        <CustomInput
          name="email"
          label="E-Mail"
          control={control}
          placeholder="Ingrese su Email"
        />
        <CustomInput
          name="password"
          label="Contraseña"
          control={control}
          placeholder="Ingrese su contraseña"
          secureTextEntry
        />
        <CustomButton
          onPress={handleSubmit(handleLogin)}
          text="Inicial Sesión"
          type="Primary"
          bgColor=""
          txColor="#f3f3f3"
          icon="sign-in"
        />
        <CustomButton
          onPress={goToForgotPassword}
          text="¿Olvidó su clave de acceso?"
          type="Link"
        />
        {/* <SocialLoging /> */}
        <Text style={styles.text}>¿Aún no tienes una cuenta? </Text>
        <Text onPress={goToRegister} style={[styles.text, styles.link]}>
          Accede aquí y crea una cuenta
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
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: '700',
  },
  text: {
    textAlign: 'center',
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
