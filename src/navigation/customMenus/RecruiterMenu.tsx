import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, ROUTES } from "../../constants";
import { UserContext } from "../../GlobalStates/userContext";
import { MenuButtonItem } from "./MenuButtonItem";

type Props = {};

export const RecruiterMenu = (props: Props) => {
  const { currentUser } = useContext(UserContext);
  const navigation = useNavigation();

  const { firstname, lastname, avatar } = currentUser;

  const userImage =
    avatar ||
    "https://www.pngitem.com/pimgs/m/499-4992374_sin-imagen-de-perfil-hd-png-download.png";

  return (
    <>
      <View style={styles.header}>
        <Image source={{ uri: userImage }} style={styles.image} />
        <View>
          <Text style={styles.title}>
            {firstname} {lastname}
          </Text>
        </View>
      </View>
      <MenuButtonItem
        text={ROUTES.HOME_RECRUITER}
        onPress={() => navigation.navigate(ROUTES.HOME_RECRUITER_DRAWER)}
        icon="home-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={ROUTES.JOBSPOST}
        onPress={() => navigation.navigate(ROUTES.JOBSPOST_DRAWER)}
        icon="reader-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={ROUTES.JOBSEEKERLIST}
        onPress={() => navigation.navigate(ROUTES.JOBSEEKERLIST_DRAWER)}
        icon="reader-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={"Cerrar Sesión"}
        onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
        icon="exit-outline"
        color={COLORS.dark}
      />
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    width: "100%",
  },
  rol: {
    color: COLORS.primary,
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
