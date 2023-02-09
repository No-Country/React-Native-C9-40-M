import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from '@expo/vector-icons';

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
  const [selected, setSelected] = useState("");
  const [country, setCountry] = useState();

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

  const technology = [
    { key: "1", value: "Javascript" },
    { key: "2", value: "React" },
    { key: "3", value: "Typescript" },
    { key: "4", value: "React-Native" },
    { key: "5", value: "Angular" },
    { key: "6", value: "Vue" },
    { key: "7", value: "Svelte" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>¿A qué te dedicas?</Text>
      <Text style={styles.descriptionText}>
        Cuéntanos cual es el rol que mas te identifica. (Selecciona solo una)
      </Text>
      <View style={{marginTop: 20}}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Tu rol principal es:</Text>
        <SelectList
          style={styles.input}
          setSelected={(val) => setSelected(val)}
          data={data}
          dropdownStyles={{ backgroundColor: "#EBEBEB" }}
          dropdownItemStyles={{ marginHorizontal: 5, fontWeight: 'bold' }}
          placeholder="Rol"
          maxHeight={130}
          notFoundText="No se encontro ningun rol"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Tecnologias asociadas:</Text>
        <SelectList
          style={styles.input}
          setSelected={(val) => setSelected(val)}
          data={technology}
          dropdownStyles={{ backgroundColor: "#EBEBEB" }}
          dropdownItemStyles={{ marginHorizontal: 5, fontWeight: 'bold' }}
          placeholder="Rol"
          maxHeight={130}
          notFoundText="No se encontro ningun rol"
        />
      </View>
      </View>
      <View style={styles.nextContainer}>
      <Ionicons name="ios-arrow-forward" size={30} color="#000" />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "flex-start",
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
    fontFamily: "Inter",
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  descriptionText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    width: 301,
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
  nextContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4D4A4A',
    borderRadius: 8
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: "35%",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 14,
  },
});
