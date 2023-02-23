import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const CustomTextArea = (props) => {
  return (
    <View style={styles.field}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginVertical: 5,
    marginHorizontal: "8%",
    marginTop: "8%",
  },
  container: {
    width: "100%",
    height: 128,
    backgroundColor: "#F7F6F5",
    borderWidth: 1,
    borderColor: "#363740",
    borderRadius: 4,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    textAlignVertical: "top",
  },
});
