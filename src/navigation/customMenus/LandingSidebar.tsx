import { Image, StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import { COLORS, ROUTES } from "../../constants";
import logo from "../../../assets/images/logo.png";
import { UserMenu } from "./UserMenu";
import { LandingMenu } from "./LandingMenu";
import { RecruiterMenu } from "./RecruiterMenu";

export const LandingSidebar = ({ state }) => {
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

    case ROUTES.HOME:
    case ROUTES.HOME_DRAWER:
    case ROUTES.PROFILE_SHOW:
    case ROUTES.PROFILE_SHOW_DRAWER:
    case ROUTES.PROFILE:
    case ROUTES.PROFILE_DRAWER:
    case ROUTES.APPLICATIONS:
    case ROUTES.APPLICATIONS_DRAWER:
    case ROUTES.NOTIFICATION:
    case ROUTES.NOTIFICATION_DRAWER:
    case ROUTES.SETTING:
    case ROUTES.SETTING_DRAWER:
    case ROUTES.JOBS:
    case ROUTES.JOBS_DRAWER:
      activeScreen = "Menu User";
      bgColor = COLORS.cardBg;

      break;
    case ROUTES.HOME_RECRUITER_DRAWER:
    case ROUTES.JOBSPOST:
    case ROUTES.JOBSPOST_DRAWER:
    case ROUTES.JOBSEEKERLIST:
    case ROUTES.JOBSEEKERLIST_DRAWER:
      activeScreen = "Menu Recruiter";
      bgColor = COLORS.cardBg;
      break;
    default:
      activeScreen = "Menu inicial";
      bgColor = "#FFEBD7";
      break;
  }

  return (
    <DrawerContentScrollView
      style={[styles.menuContainer, { backgroundColor: bgColor }]}
    >
      <>
        {activeScreen === "Menu inicial" && (
          <View>
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.image} />
            </View>
            <Text style={styles.menuTitle}>{activeScreen}</Text>
          </View>
        )}
        {activeScreen === "Menu inicial" && <LandingMenu />}
        {activeScreen === "Menu User" && <UserMenu />}
        {activeScreen === "Menu Recruiter" && <RecruiterMenu />}
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
