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

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../../utils/validationSchema/getCV";

import { CustomInput } from "../common/CustomInput";
import { UserContext } from "../../GlobalStates/userContext";
import { useUpdateUser } from "../../hooks/useUpdateUser";

type FormValues = {
  url_portfolio: string;
  gitUrl: string;
};

interface Document {
  uri: string;
  name: string;
  type: string;
}

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const ThirdStep = ({ handleGoTo }: Props) => {
  const { currentUser } = useContext(UserContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      url_portfolio: currentUser.url_portfolio,
      gitUrl: currentUser.portfolio, // hay que cambiar luego
    },
    // resolver: yupResolver(schema),
  });

  const handleSaveData = async (data: FormValues) => {
    const userData = {
      url_portfolio: data.url_portfolio,
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
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Sobre la vacante</Text>
        <Text style={styles.subtitle}>
          Completa los detalles del puesto requerido para encontrar al candidato
          ideal..
        </Text>
      </View>
      <View style={styles.formContainer}>
        <CustomInput
          name="job_work_place"
          label="Modalidad"
          control={control}
          placeholder="modalidad"
        />
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
        <CustomInput
          name="job_working_day"
          label="Jornada"
          control={control}
          placeholder="Jornada"
        />
        <CustomInput
          name="job_desc"
          label="Descripción"
          control={control}
          placeholder="Descripción"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    alignItems: "center",
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
  formContainer: {
    flex: 1,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "500",
    color: "#0E1545",
    width: 301,
    height: 50,
    top: 21,
    left: 18,
    fontSize: 24,
  },
  subtitle: {
    fontStyle: "normal",
    top: 24,
    left: 20,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "700",
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  link: {
    color: "blue",
  },
  logo: {
    width: "100%",
    maxWidth: 200,
    height: 150,
    resizeMode: "contain",
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
    color: "#3d3d3d",
    marginBottom: 5,
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
  },
  error: { color: "red", alignSelf: "stretch" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
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
