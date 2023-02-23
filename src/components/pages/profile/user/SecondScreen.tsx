import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { UserContext } from "../../../../GlobalStates/userContext";
import logo from "../../assets/images/logo.png";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const SecondScreen = ({ step, handleGoTo }: Props) => {
  const { selectedRol, setselectedRol, data } = useContext(UserContext);

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
  const rols = data.map((item) => ({ value: item.name }));

  //Funciones de navegacion con sus condicionales
  const handleBack = () => {
    handleGoTo("prev");
    console.log("regresar");
  };
  const handleNext = () => {
    if (selectedRol) {
      handleGoTo("next");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  //Si se vuelve a esta pagina restablecer el rol porque se da a entender que quiere cambiarlo
  useEffect(() => {
    setselectedRol(null);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <View>
          <Text style={styles.titleText}>¿A qué te dedicas?</Text>
          <Text style={styles.descriptionText}>
            Cuentanos cual es el rol que mas te identifica (selecciona solo una)
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>
              {selectedRol
                ? `Tu rol principal es ${selectedRol}`
                : "Tu rol principal"}
            </Text>
            <SelectList
              setSelected={(val) => setselectedRol(val)}
              data={rols}
              boxStyles={styles.dropdown}
              dropdownStyles={styles.dropdown}
              checkBoxStyles={styles.checkbox}
              dropdownTextStyles={styles.textCheckbox}
              badgeStyles={{ backgroundColor: "#27358F" }}
              placeholder="Selecciona una opción"
              searchPlaceholder={
                error
                  ? "No seleccionaste una opcion"
                  : "Busca tu rol en el mundo IT"
              }
              maxHeight={200}
              notFoundText="No se encontro ningun rol"
            />
            {error ? (
              <Text style={styles.textError}>¡Debes seleccionar un Rol!</Text>
            ) : (
              ""
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
              <View style={styles.buttonStyles}>
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
    backgroundColor: "#fff",
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
    color: "#0E1545",
    width: 301,
    height: 50,
    top: 21,
    left: 18,
    fontSize: 24,
    letterSpacing: -0.011,
  },
  inputContainer: {
    zIndex: 100,
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
    top: 24,
    left: 20,
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

  dropdown: {
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
    width: 70,
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
