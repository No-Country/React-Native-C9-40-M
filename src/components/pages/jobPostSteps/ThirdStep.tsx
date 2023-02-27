import React, { useContext, useState } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { schema } from "../../../utils/validationSchema/jobPost";

import { COLORS } from "../../../constants";

import { CustomInput } from "../../common/CustomInput";
import { UserContext } from "../../../GlobalStates/userContext";
import { useUpdateUser } from "../../../hooks/useUpdateUser";
import { SelectDropdown } from "../../common/CustomDropdown";

const dataModalidad = [
  { id: "01", name: "Presencial" },
  { id: "02", name: "Hibrido" },
  { id: "03", name: "Remoto" },
];
const dataJornada = [
  { id: "01", name: "Full Time" },
  { id: "02", name: "Medio Tiempo" },
  { id: "03", name: "Por proyectos" },
];

type FormValues = {
  job_country: string;
  job_region: string;
  job_desc: string;
  job_work_place: string;
  job_working_day: string;
};

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  jobPost: CurrentJobPost;
  setJobPost: () => void;
  handleGoTo: (direction: Direction) => void;
};

export const ThirdStep = ({ jobPost, setJobPost, handleGoTo }: Props) => {
  const { currentUser } = useContext(UserContext);
  const [job_work_place, setJobWorkPlace] = useState(jobPost.job_work_place);
  const [job_working_day, setJobWorkingDay] = useState(jobPost.job_working_day);
  const [msgError, setMsgError] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      job_country: jobPost.job_country,
      job_region: jobPost.job_region,
      job_desc: jobPost.job_desc,
    },
    resolver: yupResolver(schema),
  });

  const onSelectWorkPlace = (item) => {
    setJobWorkPlace(item);
  };

  const onSelectWorkingDay = (item) => {
    setJobWorkingDay(item);
  };

  const handleSaveData = async (data: FormValues) => {
    setMsgError(null);
    if (job_work_place === "") {
      setMsgError({ error_work_place: "Debe de seleccionar una modalidad" });
      return;
    }
    if (job_working_day === "") {
      setMsgError({ error_working_day: "Debe de seleccionar una jornada" });
      return;
    }

    const newJobPost = {
      ...jobPost,
      job_country: data.job_country,
      job_region: data.job_region,
      job_desc: data.job_desc,
      job_working_day,
      job_work_place,
    };
    const userData = {
      ...newJobPost,
      token: currentUser.token,
    };
    const resp = await useUpdateUser(userData);

    console.log("carga exitosa se pasan los datos al backend", resp);
    handleNext();
  };

  // Para navegar entre las pantallas
  const handleBack = () => {
    handleGoTo("prev");
  };
  const handleNext = () => {
    handleGoTo("next");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sobre la vacante</Text>
        <Text style={styles.subtitle}>
          Completa los detalles del puesto requerido para encontrar al candidato
          ideal..
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          name="job_country"
          label="País"
          control={control}
          placeholder="Pais"
        />
        <CustomInput
          name="job_region"
          label="Ciudad"
          control={control}
          placeholder="Ciudad"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Modalidad</Text>
        <SelectDropdown
          value={job_work_place}
          data={dataModalidad}
          onSelect={onSelectWorkPlace}
        />
        {msgError?.error_work_place && (
          <View style={styles.errorCont}>
            <Ionicons name="warning-outline" size={14} color={COLORS.danger} />
            <Text style={styles.error}>
              {msgError.error_work_place || "Error"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Jornada</Text>
        <SelectDropdown
          value={job_working_day}
          data={dataJornada}
          onSelect={onSelectWorkingDay}
        />
        {msgError?.error_working_day && (
          <View style={styles.errorCont}>
            <Ionicons name="warning-outline" size={14} color={COLORS.danger} />
            <Text style={styles.error}>
              {msgError.error_working_day || "Error"}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.formContainer}>
          <CustomInput
            name="job_desc"
            label="Descripción"
            control={control}
            placeholder="Descripción"
            multiline
          />

          <View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleBack}>
                <View style={styles.buttonStyles}>
                  <Entypo name="arrow-left" size={24} color="white" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSubmit(handleSaveData)}>
                <View style={styles.buttonStyles}>
                  <Entypo name="arrow-right" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
  },
  header: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  inputContainer: {
    zIndex: 100,
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  formContainer: {
    flex: 1,
  },
  bold: {
    fontWeight: "700",
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  errorMsg: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  errorText: {
    color: "white",
    padding: 5,
  },
  field: {
    marginVertical: 5,
    marginHorizontal: 30,
  },
  label: {
    color: COLORS.primary,
    marginBottom: 5,
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
  },
  error: { marginLeft: 5, color: COLORS.danger, alignSelf: "stretch" },
  focus: { backgroundColor: COLORS.logoBlueLight },
  noFocus: { backgroundColor: COLORS.inputBg },
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
  errorCont: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
