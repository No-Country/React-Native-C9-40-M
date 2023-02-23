import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

import { CustomButton } from "../components/common/CustomButton";
import { useNavigation } from "@react-navigation/native";

const dataBase = [
  "UX/UI",
  "Frontend",
  "Backend",
  "QA Tester",
  "QA Automation",
  "Devops",
  "Product Owner",
  "Marketing Digital",
];

export function Rol() {
  const [selectedRol, setselectedRol] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const data = [
    { key: "1", value: "Frontend" },
    { key: "2", value: "Backend" },
    { key: "3", value: "UX/UI" },
    { key: "4", value: "Devops" },
    { key: "5", value: "QA Tester" },
    { key: "6", value: "QA Automation" },
    { key: "7", value: "Product Owner" },
    { key: "8", value: "Marketing Digital" },
  ];

  function navigate() {
    if (selectedRol) {
      navigation.navigate("SelectStack", { selectedRol });
    } else if (selectedRol) {
      setError(false);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.secondView}>
        <Text style={styles.titleText}>¿A qué te dedicas?</Text>
        <Text style={styles.descriptionText}>
          Cuéntanos cual es el rol que mas te identifica y que herramientas
          utilizas.
        </Text>
        <Text></Text>
        <View style={{ marginTop: 20 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>
              {selectedRol
                ? `Tu rol principal es ${selectedRol}`
                : "Tu rol principal"}
            </Text>
            <SelectList
              style={styles.input}
              setSelected={(val) => setselectedRol(val)}
              data={data}
              save="value"
              dropdownStyles={{ backgroundColor: "#EBEBEB", zIndex: 100 }}
              dropdownItemStyles={{ marginHorizontal: 5, fontWeight: "bold" }}
              placeholder="Selecciona una opción"
              searchPlaceholder="Busca tu rol en el mundo IT"
              maxHeight={400}
              notFoundText="No se encontro ningun rol"
            />
            {error ? (
              <Text style={{ marginLeft: 20, position: "absolute", top: 100 }}>
                Debes seleccionar una tecnologia
              </Text>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Confirmar"
          bgColor="black"
          onPress={() => navigate()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  secondView: {
    flex: 1,
  },
  headerContainer: {
    width: 142,
    height: 80,
    padding: 16,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 21,
    top: 44,
    paddingHorizontal: 15,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    width: 80,
    fontWeight: "bold",
  },
  logoText: {
    fontSize: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontStyle: "normal",
    fontWeight: "bold",
    width: 301,
    height: 36,
    top: 21,
    left: 16,
    fontSize: 24,
    marginBottom: 10,
    letterSpacing: -0.011,
  },
  inputContainer: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  descriptionText: {
    fontStyle: "normal",
    width: 320,
    height: 52,
    top: 24,
    left: 20,
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 20,
  },
  square: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    borderWidth: 1,
    borderColor: "#4D4A4A",
    borderRadius: 8,
    width: 140,
    height: 60,
  },
  category: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    gap: 20,
    margin: 15,
  },

  stackContainer: {
    position: "absolute",
    minHeight: 600,
    left: 20,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  stackItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
});
