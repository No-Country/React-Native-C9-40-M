import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants";
import { UserContext } from "../../../GlobalStates/userContext";
type Props = {};

export const SummaryProfile = (props: Props) => {
  const { currentUser } = useContext(UserContext);
  const { about_me } = currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre mí </Text>
      <Text style={styles.desc} numberOfLines={4}>
        {about_me}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  desc: {
    marginVertical: 10,
    minWidth: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
});
