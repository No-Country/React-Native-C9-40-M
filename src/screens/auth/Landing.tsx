import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logo from "../../../assets/images/logo.png";
import landingImage from "../../../assets/images/bro.png";
import { COLORS, ROUTES } from "../../constants";
import { CustomButton } from "../../components/common/CustomButton";
import { UserContext } from "../../GlobalStates/userContext";

const initialUser = {
  token: null,
  about_me: null,
  age: null,
  article_1: null,
  avatar: null,
  country: null,
  email: null,
  firstname: null,
  id: null,
  is_verify: false,
  lastname: null,
  phone: null,
  projects: [],
  region: null,
  repositories: [],
  status: null,
  url_github: null,
  url_linkedin: null,
  user_rols: [],
  user_tecnologies: [],
  isFreelancer: false,
};

export function LandingScreen() {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser, setPath } = useContext(UserContext);

  const onPressLogin = (): void => {
    navigation.navigate(ROUTES.LOGIN);
  };

  const onPressRegister = (): void => {
    navigation.navigate(ROUTES.REGISTER);
  };

  useEffect(() => {
    setCurrentUser(initialUser);
    setPath(0);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.subtitle}>
          La manera más fácil para postularte a tu trabajo ideal en tecnología.
        </Text>
        <Image source={landingImage} style={styles.image} />
        <CustomButton
          onPress={onPressLogin}
          text="Ingresar"
          bgColor={COLORS.primary}
        />
        <Text style={styles.text}>¿No tienes cuenta? </Text>
        <View style={styles.border}>
          <CustomButton
            onPress={onPressRegister}
            text="Registrate aquí"
            type="Link"
            txColor={COLORS.primary}
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
    fontWeight: "700",
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
