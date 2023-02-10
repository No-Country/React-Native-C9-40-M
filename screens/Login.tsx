import { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/validationSchema/login';

import logo from '../assets/images/logo.png';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';

import { useLogin } from '../hooks/useLogin';
import { UserContext } from '../GlobalStates/userContext';
import { COLORS } from '../constants';

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
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>
          <Text style={[styles.bold, styles.gold]}>¡Jobs</Text>
          <Text style={[styles.bold, styles.blue]}> Match</Text> te da la
          bienvenida!
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
          keyboardType="email-address"
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
          icon="sign-in"
        />
        <CustomButton
          onPress={goToForgotPassword}
          text="¿Olvidó su clave de acceso?"
          type="Link"
        />
      </View>
      <Text style={styles.text}>¿Aún no tienes una cuenta? </Text>
      <Text onPress={goToRegister} style={[styles.text, styles.link]}>
        Accede aquí y crea una cuenta
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  bold: {
    fontWeight: '700',
  },
  gold: {
    color: COLORS.logoGold,
  },
  blue: {
    color: COLORS.logoBlue,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
  },
  logo: {
    width: '100%',
    maxWidth: 200,
    height: 150,
    resizeMode: 'contain',
  },
  errorMsg: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  errorText: {
    color: 'white',
    padding: 5,
  },
});
