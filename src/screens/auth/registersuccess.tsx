import React from "react";
import { ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logo from "../../../assets/images/logo.png";
import landingImage from "../../../assets/images/bro2.png";
import { COLORS, ROUTES } from "../../constants";
import { CustomButton } from "../../components/common/CustomButton";

export function RegisterSuccess() {
  const navigation = useNavigation();

  const onPressLogin = (): void => {
    navigation.navigate(ROUTES.LOGIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.subtitle}>
          <Text style={styles.bold}>¡Ya estas Registrado! </Text>Ahora puedes
          ingresar y completar tu perfil.
        </Text>
        <Image source={landingImage} style={styles.image} />
        <CustomButton
          onPress={onPressLogin}
          text="Ingresar"
          bgColor={COLORS.primary}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.screenBg,
    padding: 10,
  },
  logo: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
    marginVertical: 40,
  },
  image: {
    width: "90%",
    height: 250,
    resizeMode: "contain",
    marginVertical: 20,
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
    color: COLORS.primary,
    fontWeight: "600",
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    color: COLORS.black,
  },

  border: {
    width: "50%",
    alignSelf: "center",
    marginTop: -30,
    borderColor: "transparent",
    borderBottomColor: COLORS.logoGold,
    borderWidth: 2,
    marginBottom: 30,
  },
});
