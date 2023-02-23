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
    password: yup.string().required("Debe de indicar la clave"),
    pwdConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Las claves no coinciden")
      .required("Obligatorio"),
  })
  .required();
type Props = {};

export const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      password: "",
      pwdConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const handleReset = () => {
    navigation.navigate(ROUTES.LOGIN);
  };
  const goToLogin = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Reset Password</Text>
      </View>
      <View style={styles.formContainer}>
        <CustomInput
          name="code"
          label="Código enviado a su E-mail"
          control={control}
          placeholder="ingresa el código enviado a tu E-mail"
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
          onPress={handleSubmit(handleReset)}
          text="Registrarme"
          type="Primary"
          bgColor=""
          txColor="#f3f3f3"
          icon="sign-in"
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
  bold: {
    fontWeight: "700",
  },
  logo: {
    width: "100%",
    maxWidth: 100,
    height: 100,
    resizeMode: "contain",
  },
  buttonContainer: {
    marginBottom: 50,
  },
});
