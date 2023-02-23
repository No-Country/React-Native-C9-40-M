import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import logo from "../../../assets/images/logo.png";
import { CustomInput } from "../../components/common/CustomInput";
import { CustomButton } from "../../components/common/CustomButton";
import { ROUTES } from "../../constants";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email invalido")
      .required("Debe de indicar su e-mail"),
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
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSendEmail = (data) => {
    navigation.navigate(ROUTES.RESET_PASSWORD);
  };
  const goToLogin = () => {
    navigation.navigate(ROUTES.LOGIN_DRAWER);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>¿Olvidó su Password?</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomInput
          name="email"
          label="E-Mail"
          control={control}
          placeholder="email"
        />

        <CustomButton
          onPress={handleSubmit(handleSendEmail)}
          text="Confirmar"
          type="Primary"
          bgColor=""
          txColor="#f3f3f3"
          icon="check"
        />

        <CustomButton
          onPress={goToLogin}
          text="Regresar a Login"
          type={"Link"}
          bgColor=""
          txColor=""
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 100,
    height: 100,
    resizeMode: "contain",
  },
});
