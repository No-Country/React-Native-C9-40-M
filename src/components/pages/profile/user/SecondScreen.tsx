import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { UserContext } from "../../../../GlobalStates/userContext";
import { SelectDropdown } from "../../../common/CustomSelectDropdown";
import { CustomTextArea } from "../../../common";
import { useForm } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants";
import CustomInputNumber from "../../../common/CustomInputNumber";
import CustomNavigateButton from "../../../common/CustomNavigateButton";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const SecondScreen = ({ step, handleGoTo }: Props) => {
  const {
    selectedRol,
    setselectedRol,
    data,
    experience,
    setExperience,
    description,
    setDescription,
    currentUser,
    setCurrentUser,
  } = useContext(UserContext);
  const [error, setError] = useState(false);

  // Obtenemos los roles
  const rols = data.map((item) => ({ id: item.id, name: item.name }));

  //Funciones de navegacion con sus condicionales
  const handleBack = () => {
    handleGoTo("prev");
    console.log("regresar");
  };
  const handleNext = () => {
    if (selectedRol && experience) {
      const newUserTecnhology =
        selectedRol.name !== currentUser.user_rols[0]?.name
          ? []
          : currentUser.user_tecnologies;
      const newCurrentUser = {
        ...currentUser,
        selectedRol,
        experience,
        description,
        user_rols: [selectedRol],
        user_tecnologies: newUserTecnhology,
      };
      setCurrentUser(newCurrentUser);
      handleGoTo("next");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  /*Eliminar todo */
  const deleteAll = () => {
    setselectedRol("");
    setExperience(0);
  };

  console.log(selectedRol);
  console.log(currentUser.user_rols[0]);

  const handleBlurEdad = (value) => {
    setExperience(value);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <View>
          <Text style={styles.titleText}>¿A qué te dedicas?</Text>
          <Text style={styles.descriptionText}>
            Cuentanos cual es el rol que mas te identifica (selecciona solo uno)
          </Text>

          <View style={styles.inputContainer}>
            {selectedRol ? (
              <View>
                <View style={{ ...styles.info, marginTop: 10 }}>
                  <Text style={{ color: "white", left: 15 }}>
                    {selectedRol ? selectedRol.name : ""}
                  </Text>
                  <View style={styles.materialIconStyle}>
                    <MaterialIcons
                      onPress={() => deleteAll()}
                      name="cancel"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>
                {experience ? (
                  <View>
                    <View style={{ ...styles.info, marginTop: 10 }}>
                      <Text style={{ color: "white", left: 15 }}>
                        {experience + " " + "años de experiencia"}
                      </Text>
                      <View style={styles.materialIconStyle}>
                        <MaterialIcons
                          onPress={() => setExperience(0)}
                          name="cancel"
                          size={24}
                          color="white"
                        />
                      </View>
                    </View>
                    <CustomTextArea
                      title=""
                      placeholder="Cuentanos un poco acerca de ti"
                      value={description}
                    />
                  </View>
                ) : (
                  <View>
                    <View style={{ marginTop: 20 }}>
                      <CustomInputNumber onBlur={handleBlurEdad} />
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <View style={{ maxWidth: "95%", marginHorizontal: -10 }}>
                <SelectDropdown
                  data={rols}
                  onSelect={setselectedRol}
                  value={selectedRol}
                />
              </View>
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
    width: 301,
    height: 50,
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 25,
    letterSpacing: -0.011,
  },
  inputContainer: {
    zIndex: 100,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 255,
    height: 45,
    marginTop: 15,
    backgroundColor: "#27358F",
    borderRadius: 8,
    position: "relative",
  },

  materialIconStyle: {
    position: "absolute",
    right: 7,
  },

  inputText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },

  inputRol: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },

  descriptionText: {
    fontStyle: "normal",
    maxWidth: "85%",
    marginHorizontal: 20,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 10,
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

  textError: {
    top: 10,
    color: "#AA1E1E",
    fontWeight: "bold",
  },

  boxStyles: {
    height: 56,
    marginTop: 10,
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

  inputStyles: {
    marginTop: "2%",
  },

  dropdown: {
    marginTop: 15,
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

  inputError: {
    backgroundColor: "#AA1E1E",
    height: 2,
    top: 10,
  },

  textCheckbox: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
  },
});
