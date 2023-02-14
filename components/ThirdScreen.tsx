import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { COLORS } from "../constants";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { CustomButton } from "./CustomButton";
import { useContext, useState } from "react";
import { UserContext } from "../GlobalStates/userContext";
import logo from "../assets/images/logo.png";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const ThirdScreen = ({ step, handleGoTo }: Props) => {
  const [selectStack, setSelectStack] = useState([]);

  const value = useContext(UserContext);
  const selectedRol = value.selectedRol;
  const setselectedRol = value.setselectedRol;

  const handleBack = () => {
    handleGoTo("prev");
  };

  const handleNext = () => {
    console.log("Validar datos antes de pasar  la siguiente pantalla");
    handleGoTo("next");
  };

  const addStack = (val) => {
    if (selectStack.includes(val)) {
      return;
    }
    setSelectStack([...selectStack, val]);
  };

  const technology = [
    { key: "Javascript", type: "Frontend", value: "Javascript" },
    { type: "Frontend", value: "HTML" },
    { type: "Frontend", value: "React" },
    { type: "Frontend", value: "Typescript" },
    { type: "Frontend", value: "React-Native" },
    { type: "Frontend", value: "Angular" },
    { type: "Frontend", value: "Vue" },
    { type: "Frontend", value: "Svelte" },
    { type: "Backend", value: "Node" },
    { type: "Backend", value: "PHP" },
    { type: "Backend", value: "Java" },
    { type: "Backend", value: "C#" },
    { type: "Backend", value: "Kotlin" },
    { type: "Backend", value: "Python" },
    { type: "Backend", value: "MongoDb" },
    { type: "Backend", value: "MySQL" },
    { type: "UX/UI", value: "Adobe Photoshop" },
    { type: "UX/UI", value: "Adobe XD" },
    { type: "UX/UI", value: "Metodologias" },
    { type: "UX/UI", value: "UX Writing" },
    { type: "UX/UI", value: "Sketch" },
    { type: "UX/UI", value: "Balsamiq" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <View style={{ width: 50 }}>
            <CustomButton
              onPress={handleBack}
              text=""
              icon="arrow-circle-left"
              bgColor={COLORS.logoBlue}
            />
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Image source={logo} style={{ width: 150, height: 80 }} />
        </View>
      </View>

      <View>
        <Text style={styles.titleText}>
          ¿Que tecnologias y herramientas utilizas?
        </Text>
        <Text style={styles.titleText}>herramientas utilizas?</Text>
        <Text style={styles.descriptionText}>
          Cuéntanos cual es el rol que mas te identifica y que herramientas
          utilizas.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            {selectedRol
              ? `Tecnologias asociadas al ${selectedRol}`
              : "Tecnologias asociadas"}
          </Text>
          <MultipleSelectList
            setSelected={(val) => addStack(val)}
            data={technology.filter((tecno) => tecno.type == selectedRol)}
            dropdownStyles={{ backgroundColor: "#EBEBEB", borderRadius: 5 }}
            save="value"
            badgeStyles={{ backgroundColor: "#27358F" }}
            label="Tu Stack:"
            placeholder="Selecciona tu stack de tecnologías"
            searchPlaceholder="Busca tus tecnologías"
            maxHeight={310}
            notFoundText="No se encontro ningun rol"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Confirmar"
          bgColor={COLORS.logoBlue}
          onPress={() => handleNext()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    background: "#D9D9D9",
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
    width: "100%",
    marginTop: 20,
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

  stackItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    top: 720,
    alignSelf: "center",
  },
});
