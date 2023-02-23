import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";

{
  /*---------------TYPES-------------------- */
}
type Direction = {
  direction: "next" | "prev";
};

type Props = {
  allRol: [];
  jobPost: CurrentJobPost;
  setJobPost: () => void;
  handleGoTo: (direction: Direction) => void;
};

export const FirstStep = ({
  allRol,
  jobPost,
  setJobPost,
  handleGoTo,
}: Props) => {
  const [selectedRol, setSelectedRol] = useState(jobPost.job_offered);
  const [error, setError] = useState(false);

  const handleNext = async () => {
    //if everything right go to next screen

    const newJobPost = { ...jobPost, job_offered: selectedRol };
    setJobPost(newJobPost);
    handleGoTo("next");

    // const respuestaUpdate = await usePostJob(jobPostData);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <View>
          <Text style={styles.titleText}>¿Qué rol estas buscando?</Text>
          <Text style={styles.descriptionText}>Crea una nueva vacante</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>
              {selectedRol
                ? `El perfil buscado es ${selectedRol}`
                : "¿Qué perfil buscas?"}
            </Text>
            <SelectList
              setSelected={(val) => setSelectedRol(val)}
              data={allRol}
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
      <View style={styles.buttonContainer}>
        {selectedRol && (
          <TouchableOpacity onPress={() => handleNext()}>
            <View style={styles.buttonStyles}>
              <Entypo name="arrow-right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
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
  titleText: {
    fontStyle: "normal",
    fontWeight: "500",
    color: "#0E1545",
    width: 301,
    height: 50,
    top: 21,
    left: 18,
    fontSize: 24,
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

  textError: {
    top: 10,
    color: "#AA1E1E",
    fontWeight: "bold",
  },

  dropdown: {
    marginTop: 10,
    backgroundColor: "#E3E5FA",
    borderRadius: 16,
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
    justifyContent: "flex-end",
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
