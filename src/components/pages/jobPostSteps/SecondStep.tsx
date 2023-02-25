import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { MultipleSelectDropdown } from "../../common/CustomDropdown";
import { COLORS } from "../../../constants";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  rolTec: [];
  jobPost: CurrentJobPost;
  setJobPost: () => void;
  handleGoTo: (direction: Direction) => void;
};

export const SecondStep = ({
  rolTec,
  jobPost,
  setJobPost,
  handleGoTo,
}: Props) => {
  const [selectedStack, setSelectedStack] = useState(jobPost.job_requirements);

  console.log("entrando ", selectedStack, jobPost.job_requirements);

  const handleBack = () => {
    handleGoTo("prev");
  };

  const handleNext = () => {
    if (selectedStack.length > 0) {
      // const job_requirements = rolTec
      //   .filter((req) => selectedStack.includes(req.value))
      //   .map((tec) => ({ id: tec.id, name: tec.value }));

      const newJobPost = { ...jobPost, job_requirements: selectedStack };
      setJobPost(newJobPost);
      handleGoTo("next");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <Text style={styles.title}>Elige las tecnologías</Text>
        <Text style={styles.subtitle}>
          Elige las skills requeridas para este puesto
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            Tecnologias asociadas al{" "}
            <Text style={styles.primary}>{jobPost.job_offered}</Text>
          </Text>
          {rolTec.length > 0 && (
            <MultipleSelectDropdown
              values={selectedStack}
              data={rolTec}
              onSelect={setSelectedStack}
            />
          )}
        </View>
      </ScrollView>
      <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
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
  menu: {
    flex: 1,
  },
  primary: {
    color: COLORS.primary,
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
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
