import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../../constants";
import { UserContext } from "../../../GlobalStates/userContext";
type Props = {};

export const Skills = ({ jobTecnologies }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habilidades Técnicas Requeridas </Text>
      <View style={styles.row}>
        {jobTecnologies.map((tecnology) => {
          return (
            <Text key={tecnology.tecnology_id} style={styles.skill}>
              {tecnology.tecnology.name}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    marginVertical: 10,
    minWidth: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 10,
  },
});
