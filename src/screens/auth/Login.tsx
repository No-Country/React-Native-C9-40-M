import { useContext, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/validationSchema/login";

import logo from "../../../assets/images/logo.png";
import { CustomInput } from "../../components/common/CustomInput";
import { CustomButton } from "../../components/common/CustomButton";

import { useLogin } from "../../hooks/useLogin";
import { UserContext } from "../../GlobalStates/userContext";
import { COLORS, ROUTES } from "../../constants";

type FormValues = {
  password: string;
  email: string;
};

export const LoginScreen = () => {
  const { setCurrentUser } = useContext(UserContext);

  const [loginRes, setLoginRes] = useState("");
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: FormValues) => {
    const loginResult = await useLogin(data);

    if (loginResult.token) {
      setCurrentUser({
        token: loginResult.token,
        email: loginResult.user.email,
        firstname: loginResult.user.firstname,
        lastname: loginResult.user.lastname,
        about_me: loginResult.user.about_me,
        age: loginResult.user.age,
        article_1: loginResult.user.article_1,
        avatar: loginResult.user.avatar,
        id: loginResult.user.id,
        country: loginResult.user.country,
        region: loginResult.user.region,
        phone: loginResult.user.phone,
        url_portfolio: loginResult.url_portfolio,
      });
      console.log(loginResult.user.status);

      !loginResult.user.firstname
        ? navigation.navigate(ROUTES.PROFILE_DRAWER)
        : loginResult.user.status !== "recruiter"
        ? navigation.navigate(ROUTES.HOME_DRAWER)
        : navigation.navigate(ROUTES.HOME_RECRUITER_DRAWER);
    } else {
      setLoginRes("Revisar Credenciales");
    }
  };

  const goToForgotPassword = () => {
    navigation.navigate(ROUTES.FORGOT_PASSWORD_DRAWER);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
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
            bgColor={COLORS.logoBlue}
          />

          <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
          <View style={styles.border}>
            <CustomButton
              onPress={goToForgotPassword}
              text="Accede aquí y recuperala"
              type="Link"
              txColor={COLORS.logoGold}
            />
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
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: COLORS.black,
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
  text: {
    textAlign: "center",
    marginBottom: 10,
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
  border: {
    width: "70%",
    alignSelf: "center",
    marginTop: -30,
    borderColor: "transparent",
    borderBottomColor: COLORS.logoGold,
    borderWidth: 2,
  },
});
