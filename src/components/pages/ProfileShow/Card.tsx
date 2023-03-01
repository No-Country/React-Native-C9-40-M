import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import { UserContext } from "../../../GlobalStates/userContext";

type Props = {};
export const Card = (props: Props) => {
  const { currentUser } = useContext(UserContext);
  const { region, country, url_linkedin, url_github } = currentUser;

  return (
    <View style={styles.body}>
      <Pressable
        style={styles.detailButton}
        onPress={() => alert("Editar Perfil")}
      >
        <Text style={styles.button}>Editar Perfil</Text>
      </Pressable>
      <View style={styles.row}>
        <View style={styles.mr8}>
          <Fontisto name="world-o" size={24} color="black" />
        </View>
        <Text>
          {region}, {country}
        </Text>
      </View>
      <View style={[styles.row]}>
        <View style={styles.mr8}>
          <FontAwesome name="linkedin-square" size={24} color="black" />
        </View>
        <Text>{url_linkedin}</Text>
      </View>
      <View style={[styles.row]}>
        <View style={styles.mr8}>
          <FontAwesome name="github-square" size={24} color="black" />
        </View>

        <Text>{url_github}</Text>
      </View>
      <View style={[styles.row]}>
        <View style={styles.mr8}>
          <FontAwesome name="folder-open-o" size={24} color="black" />
        </View>

        <Text>Descargar CV</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  mr8: {
    marginRight: 8,
  },
  detailButton: {
    position: "absolute",
    right: 20,
    top: -50,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: COLORS.white,
  },
});
