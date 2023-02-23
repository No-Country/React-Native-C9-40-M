import React from "react";
import { ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logo from "../../../assets/images/logo.png";
import landingImage from "../../../assets/images/bro.png";
import { COLORS, ROUTES } from "../../constants";
import { CustomButton } from "../../components/common/CustomButton";

export function LandingScreen() {
  const navigation = useNavigation();

  const onPressLogin = (): void => {
    navigation.navigate(ROUTES.LOGIN_DRAWER);
  };

  const onPressRegister = (): void => {
    navigation.navigate(ROUTES.REGISTER_DRAWER);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>
          ¡<Text style={[styles.bold, styles.blue]}>Jobs</Text>
          <Text style={[styles.bold, styles.gold]}>Match</Text> te da la
          bienvenida!
        </Text>
        <Image source={landingImage} style={styles.image} />
        <CustomButton
          onPress={onPressLogin}
          text="Ingresar"
          icon="sign-in"
          bgColor={COLORS.logoBlue}
        />
        <Text style={styles.text}>¿No tienes cuenta? </Text>
        <View style={styles.border}>
          <CustomButton
            onPress={onPressRegister}
            text="Registrate aquí"
            type="Link"
            txColor={COLORS.logoBlue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  image: {
    width: "90%",
    height: 250,
    resizeMode: "contain",
    marginVertical: 40,
  },
  logo: {
    width: "100%",
    height: 60,
    resizeMode: "contain",
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
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
    marginVertical: 10,
    color: COLORS.black,
  },
  link: {
    color: "blue",
  },
  border: {
    width: "50%",
    alignSelf: "center",
    marginTop: -30,
    borderColor: "transparent",
    borderBottomColor: COLORS.logoGold,
    borderWidth: 2,
  },
});
