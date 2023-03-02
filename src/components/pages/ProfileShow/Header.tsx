import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants";
import { UserContext } from "../../../GlobalStates/userContext";
type Props = {};
export const Header = (props: Props) => {
  const { currentUser } = useContext(UserContext);
  const { firstname, lastname, avatar, user_rols } = currentUser;
  const userImage =
    avatar ||
    "https://www.pngitem.com/pimgs/m/499-4992374_sin-imagen-de-perfil-hd-png-download.png";

  return (
    <View style={styles.header}>
      <Image source={{ uri: userImage }} style={styles.image} />
      <View>
        <Text style={styles.title}>
          {firstname} {lastname}
        </Text>
        <Text style={styles.rol}>{user_rols[0]?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
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
});
