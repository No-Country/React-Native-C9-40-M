import { useContext, useEffect, useState } from "react";

import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { UserContext } from "../../../../GlobalStates/userContext";
import { MultipleSelectDropdown } from "../../../common/CustomSelectDropdown";
import CustomNavigateButton from "../../../common/CustomNavigateButton";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const ThirdScreen = ({ step, handleGoTo }: Props) => {
  /* Aqui almacenaremos las tecnologias dependiendo el rol que se seleccionara*/
  const [stackTecno, setStackTecno] = useState([]);

  const {
    selectedRol,
    selectedStack,
    setSelectedStack,
    data,
    currentUser,
    setCurrentUser,
  } = useContext(UserContext);

  //Funciones de navegacion con sus condicionales
  const handleBack = () => {
    handleGoTo("prev");
  };

  const handleNext = () => {
    if (stackTecno.length >= 1) {
      const newCurrentUser = {
        ...currentUser,
        user_tecnologies: [selectedStack],
      };
      console.log(newCurrentUser);
      handleGoTo("next");
    }
  };

  useEffect(() => {
    setStackTecno(
      data
        .filter((rol) => rol.name === selectedRol.name)[0]
        .rol_tecnology.map((tec) => ({
          id: tec.tecnology_id,
          name: tec.tecnology.name,
        }))
    );
  }, [selectedRol]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <View>
          <Text style={styles.titleText}>¿Qué tecnologias manejas?</Text>
          <Text style={styles.descriptionText}>
            Cuéntanos cuales son tus habilidades técnicas.
          </Text>

          <View style={styles.inputContainer}>
            {stackTecno.length > 0 && (
              <MultipleSelectDropdown
                values={currentUser.user_tecnologies}
                data={stackTecno}
                onSelect={setSelectedStack}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <CustomNavigateButton handleBack={handleBack} handleNext={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },

  menu: {
    flex: 1,
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
  logo: {},
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
    fontWeight: "500",
    color: "#27358F",
    width: "70%",
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 24,
    letterSpacing: -0.011,
    marginBottom: 5,
  },
  inputContainer: {
    zIndex: 100,
    width: "100%",
    marginTop: 2,
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
    marginHorizontal: 20,
    marginTop: 5,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 10,
    width: "80%",
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

  textCheckbox: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
  },

  dropdown: {
    backgroundColor: "#E3E5FA",
    borderRadius: 16,
    borderColor: 0,
    transition: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  dropdownError: {
    backgroundColor: "#AA1E1E",
    borderRadius: 16,
    borderColor: "none",
    transition: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  checkbox: {
    height: 22,
    width: 22,
    borderColor: "#363740",
    borderWidth: 2,
    color: "#fff",
  },
});
