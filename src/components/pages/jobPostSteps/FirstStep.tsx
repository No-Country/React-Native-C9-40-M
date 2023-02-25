import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { SelectDropdown } from "../../common/CustomDropdown";
import { COLORS } from "../../../constants";

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
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = async () => {
    //if everything right go to next screen
    if (!selectedRol) {
      setErrorMsg("Debe de seleccionar un rol");
      return;
    }
    let newJobPost;
    newJobPost =
      selectedRol === jobPost.job_offered
        ? (newJobPost = { ...jobPost, job_offered: selectedRol })
        : (newJobPost = {
            ...jobPost,
            job_offered: selectedRol,
            job_requirements: [],
          });
    setJobPost(newJobPost);
    handleGoTo("next");

    // const respuestaUpdate = await usePostJob(jobPostData);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <Text style={styles.title}>¿Qué rol estas buscando?</Text>
        <Text style={styles.subtitle}>Crea una nueva vacante</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            {selectedRol
              ? `El perfil buscado es ${selectedRol}`
              : "¿Qué perfil buscas?"}
          </Text>

          <View>
            <SelectDropdown
              value={selectedRol}
              data={allRol}
              onSelect={setSelectedRol}
            />
          </View>

          {errorMsg && (
            <View style={styles.errorMsg}>
              <Text style={styles.errorText}> {errorMsg}</Text>
            </View>
          )}
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
    backgroundColor: COLORS.screenBg,
  },
  menu: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "300",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "300",
    paddingHorizontal: 10,
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
    color: COLORS.primary,
  },
  descriptionText: {
    fontStyle: "normal",
    top: 24,
    left: 20,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 10,
  },

  errorMsg: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dangerLight,
  },
  errorText: {
    color: COLORS.danger,
    padding: 5,
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
    backgroundColor: COLORS.primary,
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
