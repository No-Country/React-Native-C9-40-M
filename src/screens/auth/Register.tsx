import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/validationSchema/register";

import logo from "../../../assets/images/logo.png";
import { CustomInput } from "../../components/common/CustomInput";
import { CustomButton } from "../../components/common/CustomButton";

import { useRegister } from "../../hooks/useRegister";
import { COLORS, ROUTES } from "../../constants";

type FormValues = {
  email: string;
  password: string;
  pwdConfirm: string;
};

export const RegisterScreen = () => {
  const [registerRes, setRegisterRes] = useState("");
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      pwdConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: FormValues) => {
    const user = { email: data.email, password: data.password };
    const registerResult = await useRegister(user);
    if (registerResult.message === "user created") {
      navigation.navigate(ROUTES.LOGIN_DRAWER);
      console.warn("Usuario Creando satisfactoriamente");
    } else {
      setRegisterRes("Correo ya tomado");
    }
  };

  // const goToLogin = () => {
  //   navigation.navigate(ROUTES.LOGIN);
  // };

  // const goToPolicy = () => {
  //   console.warn('navegar a la pagina de terminos y politicas');
  // };

  return (
    <SafeAreaView style={styles.container}>
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

          <View style={{ alignContent: "center" }}>
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
                bgColor={COLORS.logoBlue}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  header: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  formContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "700",
  },
  gold: {
    color: COLORS.logoGold,
  },
  blue: {
    color: COLORS.logoBlue,
  },
  center: { alignItems: "center" },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  link: {
    color: "blue",
  },
  logo: {
    width: "100%",
    maxWidth: 200,
    height: 150,
    resizeMode: "contain",
  },
  buttonContainer: {
    marginBottom: 50,
  },
  errorMsg: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  errorText: {
    color: "white",
    padding: 5,
  },
});
