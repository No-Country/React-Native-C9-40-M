import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

export const CustomTextArea = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.delete}>
        <MaterialIcons name="cancel" size={28} color="#27358F" />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        multiline={true}
        numberOfLines={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: COLORS.inputBg,
    borderRadius: 4,
    padding: 10,
    marginTop: 30,
    position: "relative",
  },
  delete: {
    position: "absolute",
    right: "3%",
    top: "5%",
    zIndex: 10,
  },
  textInput: {
    width: "90%",
    height: 150,
    borderRadius: 4,
    textAlignVertical: "top",
  },
});
