import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/validationSchema/register';

import logo from '../assets/images/logo.png';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';

import { useRegister } from '../hooks/useRegister';
import { COLORS } from '../constants';

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

  const handleRegister = async (data: FormValues) => {
    const user = { email: data.email, password: data.password };
    const registerResult = await useRegister(user);
    if (registerResult.success) {
      navigation.navigate('Login');
    } else {
      setRegisterRes(registerResult.msg);
    }
    console.warn('Usuario Creando satisfactoriamente');
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  // const goToPolicy = () => {
  //   console.warn('navegar a la pagina de terminos y politicas');
  // };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Vamos a crear tu cuenta</Text>
      </View>
      <View style={styles.formContainer}>
        {registerRes && (
          <View style={styles.errorMsg}>
            <Text style={styles.errorText}> {registerRes}</Text>
          </View>
        )}

        <View style={{ alignContent: 'center' }}>
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
          <View style={styles.center}>
            <CustomButton
              onPress={handleSubmit(handleRegister)}
              text="Registrarme"
              type="Primary"
              bgColor=""
              txColor="#f3f3f3"
              icon="sign-in"
            />
          </View>
        </View>
        {/* <Text style={styles.text}>
          Al presionar registrarse esta aceptando los{' '}
          <Text onPress={goToPolicy} style={styles.link}>
            terminos y politicas{' '}
          </Text>
          privacidad
        </Text> */}

        <Text style={styles.text}>
          ¿Ya formas parte de <Text style={styles.blue}>Jobs</Text>{' '}
          <Text style={styles.gold}> Match?</Text>{' '}
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
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  formContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
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
  center: { alignItems: 'center' },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
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
  buttonContainer: {
    marginBottom: 50,
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
