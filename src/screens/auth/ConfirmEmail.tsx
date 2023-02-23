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
    code: yup.string().required("Requerido"),
  })
  .required();

type Props = {};

export const ConfirmEmailScreen = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(schema),
  });
  const handleConfirm = () => {
    console.warn("Se confirmo el Correo");
    navigation.navigate(ROUTES.HOME);
  };
  const goToLogin = () => {
    navigation.navigate(ROUTES.LOGIN);
  };
  const onResendCode = () => {
    console.warn("Se reenvio el codigo de confirmación");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Confirma tu E-Mail</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomInput
          name="code"
          label="Codigo de Confirmación"
          control={control}
          placeholder="Ingresa el codigo de confirmación enviado a tu E-mail"
        />

        <CustomButton
          onPress={handleSubmit(handleConfirm)}
          text="Confirmar"
          type="Primary"
          bgColor=""
          txColor="#f3f3f3"
          icon="check"
        />

        <CustomButton
          onPress={onResendCode}
          text="Reenviar codigo"
          type="Secondary"
          bgColor=""
          txColor=""
          icon="send"
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
