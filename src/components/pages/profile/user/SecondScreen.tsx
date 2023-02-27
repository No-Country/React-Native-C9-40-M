import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { UserContext } from "../../../../GlobalStates/userContext";
import { SelectDropdown } from "../../../common/CustomSelectDropdown";
import { CustomTextArea } from "../../../common";
import { useForm } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../../../constants";
import CustomInputNumber from "../../../common/CustomInputNumber";

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
  } = useContext(UserContext);

  const [error, setError] = useState(false);

  /* Teclado activo o no */
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

  /*Volvemos el array de los roles un objeto con clave para usar el buscador */

  const rols = data.map((item) => ({ id: item.id, name: item.name }));

  //Funciones de navegacion con sus condicionales
  const handleBack = () => {
    handleGoTo("prev");
    console.log("regresar");
  };
  const handleNext = () => {
    if (selectedRol && experience) {
      handleGoTo("next");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  // //Si se vuelve a esta pagina restablecer el rol porque se da a entender que quiere cambiarlo
  // useEffect(() => {
  //   setselectedRol(null);
  //   console.log(description);
  // }, []);

  const handleBlurEdad = (value) => {
    setExperience(value);
  };

  type FormValues = {
    empresa: string;
    descripcion: string;
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
  });

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
                <View style={styles.info}>
                  <View style={{ left: 10 }}>
                    <FontAwesome5
                      onPress={() => setselectedRol("")}
                      name="arrow-left"
                      size={24}
                      color="white"
                    />
                  </View>
                  <Text style={{ color: "white", left: 20 }}>
                    {selectedRol ? selectedRol : ""}
                  </Text>
                </View>
                {experience ? (
                  <View>
                    <View style={styles.info}>
                      <View style={{ left: 10 }}>
                        <FontAwesome5
                          onPress={() => setExperience(0)}
                          name="arrow-left"
                          size={24}
                          color="white"
                        />
                      </View>
                      <Text style={{ color: "white", left: 20 }}>
                        {experience + " " + "años de experiencia"}
                      </Text>
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
      {keyboardShown && (
        <KeyboardAvoidingView
          style={{ display: "none" }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={1000} // ajusta este valor para hacer que el elemento desaparezca
        ></KeyboardAvoidingView>
      )}
      {!keyboardShown && (
        <View>
          {/* Contenido visible cuando el teclado no está activo */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleBack()}>
              <View style={styles.buttonStyles}>
                <Entypo name="arrow-left" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNext()}>
              <View style={styles.buttonNextStyles}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginRight: 10,
                    fontWeight: "bold",
                  }}
                >
                  Guardar
                </Text>
                <Entypo name="arrow-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    justifyContent: "flex-start",
    marginTop: 20,
    width: 242,
    height: 45,
    backgroundColor: "#27358F",
    borderRadius: 8,
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
    backgroundColor: "#0E1545",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonNextStyles: {
    flexDirection: "row",
    alignContent: "center",
    width: 150,
    height: 56,
    backgroundColor: "#0E1545",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
