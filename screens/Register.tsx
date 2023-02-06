import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../assets/images/logo.png';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import SocialLoging from '../components/SocialLoging';

import { useRegister } from '../hooks/useRegister';

import { regExp } from '../utils/regExp';
const schema = yup
  .object({
    firstname: yup.string().required('Requerido'),
    lastname: yup.string().required('Requerido'),
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
  firstname: string;
  lastname: string;
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
      firstname: '',
      lastname: '',
      password: '',
      pwdConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  const goToLogin = () => {
    navigation.navigate('Login');
  };
  const handleRegister = async (data: FormValues) => {
    const registerResult = await useRegister(data);
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
        <Text style={styles.title}>CREAR CUENTA</Text>

        {registerRes && (
          <View style={styles.errorMsg}>
            <Text style={styles.errorText}> {registerRes}</Text>
          </View>
        )}

        <CustomInput
          name="firstname"
          control={control}
          placeholder="Nombre del Usuario"
        />
        <CustomInput
          name="lastname"
          control={control}
          placeholder="Apellidos"
        />
        <CustomInput name="email" control={control} placeholder="Email" />

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
        <CustomButton
          onPress={handleSubmit(handleRegister)}
          text="Registrarse"
        />

        <SocialLoging />

        <Text style={styles.text}>
          Al presionar registrarse esta aceptando los{' '}
          <Text onPress={goToPolicy} style={styles.link}>
            terminos y politicas{' '}
          </Text>
          privacidad
        </Text>

        <Text style={styles.text}>
          ¿Ya formas parte de FindYourDreamJob?{' '}
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
    backgroundColor: '#a3a3a3',
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
    maxWidth: 75,
    height: 75,
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
