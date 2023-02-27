import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const CustomInputNumber = ({ onBlur }) => {
  const [value, setValue] = useState("");

  const handleChangeText = (text) => {
    // Aquí puedes agregar validaciones o manipular el valor ingresado
    setValue(text);
  };

  const handleBlur = () => {
    // Llamada a la función onBlur pasada como prop
    onBlur(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        placeholder="Años de experiencia"
        onChangeText={handleChangeText}
        onBlur={handleBlur} // Agregamos el evento onBlur
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 8,
    width: 242,
    height: 45,
    backgroundColor: "#DFE0E6",
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    padding: 5,
    letterSpacing: 0.01,
    color: "#5D6282",
  },
});

export default CustomInputNumber;
