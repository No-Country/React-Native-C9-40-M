import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const CustomNavigateButton = ({ handleBack, handleNext }) => {
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShown(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View>
      {keyboardShown && (
        <KeyboardAvoidingView
          style={{ display: "none" }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0} // ajusta este valor para hacer que el elemento desaparezca
        ></KeyboardAvoidingView>
      )}
      {!keyboardShown && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleBack()}>
            <View style={styles.buttonStyles}>
              <Entypo name="arrow-left" size={25} color="#0E1545" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNext()}>
            <View style={styles.buttonNextStyles}>
              <Text
                style={{
                  color: "#0E1545",
                  fontSize: 19,
                  marginRight: 10,
                  fontWeight: "bold",
                }}
              >
                Guardar
              </Text>
              <Entypo name="arrow-right" size={24} color="#0E1545" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomNavigateButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    zIndex: 10,
  },
  buttonStyles: {
    flexDirection: "row",
    alignContent: "center",
    width: 80,
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0E1545",
    borderWidth: 1,
    marginLeft: 10,
  },
  buttonNextStyles: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 56,
    backgroundColor: COLORS.white,
    borderColor: "#0E1545",
    borderWidth: 1,
    borderRadius: 16,
    marginRight: 10,
  },
});
