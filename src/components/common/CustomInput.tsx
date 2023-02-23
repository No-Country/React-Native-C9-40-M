/*
 * Componente para renderizar input con validaciones y uso de React Hook Form:
 * props
 *    name: obligatorio
 *    label: obligatorio
 *    control: obligatorio ==> de React Hook Form
 *    placehorder:obligatorio
 *    maxLength: opcional numero de caracteres permitidos
 *    keyboardType: opcional
 *    placeholderTextColor: opcional
 *    secureTextEntr: boolean
 *    multiline: boolean para deteminar el alto y lineas a usar
 *
 */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { COLORS } from "../../constants";

type Props = {
  name: string;
  label: string;
  control: any;
  placeholder: string;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
};

export const CustomInput = ({
  name,
  label,
  control,
  placeholder,
  maxLength,
  keyboardType = "default",
  placeholderTextColor = COLORS.placeholder,
  secureTextEntry = false,
  multiline = false,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showTextEntry, setShowTextEntry] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setShowTextEntry(!showTextEntry);
  };
  const inputStyle = [];
  inputStyle.push(multiline ? styles.inputMultiline : styles.input);
  inputStyle.push(isFocused ? styles.focus : styles.noFocus);
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.field}>
          <Text style={styles.label}>{label}</Text>
          <View
            style={[
              !error ? styles.inputContainer : styles.inputContainerDanger,
              { position: "relative" },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              maxLength={maxLength ? maxLength : 100}
              keyboardType={keyboardType}
              placeholderTextColor={placeholderTextColor}
              style={inputStyle}
              secureTextEntry={showTextEntry}
              multiline={multiline}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {secureTextEntry && (
              <Ionicons
                name={showTextEntry ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="gray"
                onPress={togglePasswordVisibility}
                style={{ position: "absolute", top: 10, right: 20 }}
              />
            )}
          </View>
          {error && (
            <View style={styles.errorCont}>
              <Ionicons
                name="warning-outline"
                size={14}
                color={COLORS.danger}
              />
              <Text style={styles.error}>{error.message || "Error"}</Text>
            </View>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  field: {
    marginVertical: 5,
    marginHorizontal: 30,
  },
  label: {
    color: COLORS.label,
    marginBottom: 5,
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: COLORS.inputContainer,
    borderBottomColor: COLORS.borders,
    borderWidth: 0,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  inputContainerDanger: {
    width: "100%",
    borderColor: "red",
    borderWidth: 2,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    textAlignVertical: "top",
  },
  inputMultiline: {
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
  errorCont: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  error: { marginLeft: 5, color: COLORS.danger, alignSelf: "stretch" },
  focus: { backgroundColor: "#E3E5FA" },
  noFocus: { backgroundColor: COLORS.inputBg },
});
