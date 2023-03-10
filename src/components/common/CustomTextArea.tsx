import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

export const CustomTextArea = (props) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.container}>
        <View style={styles.delete}>
          <MaterialIcons name="cancel" size={28} color="#27358F" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          multiline={true}
          numberOfLines={5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: COLORS.inputBg,
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    position: "relative",
  },
  title: {
    color: COLORS.input,
    fontSize: 18,
    fontWeight: "600",
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
