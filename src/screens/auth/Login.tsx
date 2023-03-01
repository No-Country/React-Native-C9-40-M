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
import { useGetUserbyId } from "../../hooks/useGetJobSeekers";

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
    const currentUser = await useLogin(data);

    if (currentUser.token) {
      setCurrentUser({ ...currentUser.user, token: currentUser.token });

      if (!currentUser.user.status) {
        navigation.navigate(ROUTES.PROFILE_DRAWER);
      } else {
        if (currentUser.user.status === "user") {
          navigation.navigate(ROUTES.HOME_DRAWER);
        } else {
          navigation.navigate(ROUTES.HOME_RECRUITER_DRAWER);
        }
      }
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
            Ingresa con tu usuario y contraseña y postulate a las nuevas
            vacantes
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
            label="Usuario ó Email"
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
            text="Ingresar"
            bgColor={COLORS.primary}
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
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.screenBg,
    padding: 10,
  },
  logo: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
    marginVertical: 40,
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
    fontSize: 24,
    fontWeight: "300",
    textAlign: "left",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "300",
    paddingHorizontal: 20,
    textAlign: "left",
    marginBottom: 10,
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
    backgroundColor: COLORS.dangerLight,
  },
  errorText: {
    color: COLORS.danger,
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
