import { Image, StyleSheet, Text, View } from "react-native";
// import { useRoute } from '@react-navigation/native';
import { DrawerContentScrollView } from "@react-navigation/drawer";

import { COLORS, ROUTES } from "../../constants";
import { MenuButtonItem } from "./MenuButtonItem";
import logo from "../../../assets/images/logo.png";

export const LandingSidebar = ({ navigation, state }) => {
  const routeName = state.routeNames[state.index];

  let activeScreen: string;
  let bgColor: string = "ffebd7";

  switch (routeName) {
    case ROUTES.LANDING_DRAWER:
    case ROUTES.LOGIN_DRAWER:
    case ROUTES.REGISTER_DRAWER:
    case ROUTES.FORGOT_PASSWORD_DRAWER:
      activeScreen = "Menu inicial";
      bgColor = "#FFEBD7";
      break;
    case ROUTES.JOBS:
    case ROUTES.JOBS_DRAWER:
    case ROUTES.PROFILE_DRAWER:
    case ROUTES.HOME_DRAWER:
      activeScreen = "Menu User";
      bgColor = "#B5BCE5";

      break;
    case ROUTES.JOBSPOST:
    case ROUTES.JOBSPOST_DRAWER:
    case ROUTES.JOBSEEKERLIST:
    case ROUTES.JOBSEEKERLIST_DRAWER:
    case ROUTES.HOME_RECRUITER_DRAWER:
      activeScreen = "Menu Recruiter";
      bgColor = "#F7F6F5";
      break;
  }

  return (
    <DrawerContentScrollView
      style={[styles.menuContainer, { backgroundColor: bgColor }]}
    >
      <>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
        </View>
        <Text style={styles.menuTitle}>{activeScreen}</Text>
        {activeScreen === "Menu inicial" && (
          <>
            <MenuButtonItem
              text={ROUTES.LANDING}
              onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
              icon="home"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.LOGIN}
              onPress={() => navigation.navigate(ROUTES.LOGIN_DRAWER)}
              icon="sign-in"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.REGISTER}
              onPress={() => navigation.navigate(ROUTES.REGISTER_DRAWER)}
              icon="user-plus"
              color={COLORS.logoGold}
            />
          </>
        )}
        {activeScreen === "Menu User" && (
          <>
            <MenuButtonItem
              text={ROUTES.HOME}
              onPress={() => navigation.navigate(ROUTES.HOME_DRAWER)}
              icon="home"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.PROFILE}
              onPress={() => navigation.navigate(ROUTES.PROFILE_DRAWER)}
              icon="gear"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.JOBS}
              onPress={() => navigation.navigate(ROUTES.JOBS_DRAWER)}
              icon="briefcase"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={"Cerrar Sesión"}
              onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
              icon="sign-out"
              color={COLORS.logoGold}
            />
          </>
        )}
        {activeScreen === "Menu Recruiter" && (
          <>
            <MenuButtonItem
              text={ROUTES.HOME_RECRUITER}
              onPress={() => navigation.navigate(ROUTES.HOME_RECRUITER_DRAWER)}
              icon="home"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.JOBSPOST}
              onPress={() => navigation.navigate(ROUTES.JOBSPOST_DRAWER)}
              icon="wpforms"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.JOBSEEKERLIST}
              onPress={() => navigation.navigate(ROUTES.JOBSEEKERLIST_DRAWER)}
              icon="address-book-o"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={"Cerrar Sesión"}
              onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
              icon="sign-out"
              color={COLORS.logoGold}
            />
          </>
        )}
      </>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    padding: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  menuItem: {
    marginVertical: 5,
    fontSize: 18,
  },
});
