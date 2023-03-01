import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export const MenuButtonItem = ({ text, onPress, icon, color }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress} style={styles.optionContainer}>
        <View style={styles.icon}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.menuItem}> {text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 22,
    height: 22,
  },
  menuItem: {
    margin: 5,
    fontSize: 18,
  },
});
