import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../assets/images/logo.png';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
// import SocialLoging from '../components/SocialLoging';

import { useRegister } from '../hooks/useRegister';

import { regExp } from '../utils/regExp';
const schema = yup
  .object({
    email: yup.string().email('Email invalido').required('Requerido'),
    password: yup
      .string()
      .required('Obligatorio')
      .matches(
        regExp.password,
        'debe tener entre 4 y 8 caracteres al menos una Mayuscula y un numero'
      ),
    pwdConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Las claves no coinciden')
      .required('Obligatorio'),
  })
  .required();

type FormValues = {
  email: string;
  password: string;
  pwdConfirm: string;
};

export const RegisterScreen = () => {
  const [registerRes, setRegisterRes] = useState('');
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      pwdConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  const goToLogin = () => {
    navigation.navigate('Login');
  };
  const handleRegister = async (data: FormValues) => {
    const user = { email: data.email, password: data.password };
    const registerResult = await useRegister(user);
    if (registerResult.success) {
      navigation.navigate('Home');
    } else {
      setRegisterRes(registerResult.msg);
    }
    console.warn('Creand el user');
  };

  const goToPolicy = () => {
    console.warn('navegar a la pagina de terminos y politicas');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Vamos a crear tu cuenta</Text>
      </View>
      <View style={styles.formContainer}>
        {registerRes && (
          <View style={styles.errorMsg}>
            <Text style={styles.errorText}> {registerRes}</Text>
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

        <CustomInput
          name="pwdConfirm"
          label="Confirma tu contraseña"
          control={control}
          placeholder="Ingrese su contraseña"
          secureTextEntry
        />

        <CustomButton
          onPress={handleSubmit(handleRegister)}
          text="Registrarme"
          type="Primary"
          bgColor=""
          txColor="#f3f3f3"
          icon="sign-in"
        />

        {/* <SocialLoging /> */}

        <Text style={styles.text}>
          Al presionar registrarse esta aceptando los{' '}
          <Text onPress={goToPolicy} style={styles.link}>
            terminos y politicas{' '}
          </Text>
          privacidad
        </Text>

        <Text style={styles.text}>
          ¿Ya formas parte de ClipJobs?{' '}
          <Text onPress={goToLogin} style={styles.link}>
            Iniciar sesión
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
