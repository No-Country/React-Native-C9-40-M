import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../../../utils/validationSchema/jobPostStep1";

import { COLORS } from "../../../constants";
import { pickImage } from "../../../utils/pickImage";
import { CustomInput } from "../../common";

const defaultImage =
  "https://www.pngitem.com/pimgs/m/499-4992374_sin-imagen-de-perfil-hd-png-download.png";

type Direction = {
  direction: "next" | "prev";
};

type FormValues = {
  company_name: string;
  job_desc: string;
};

type Props = {
  jobPost: CurrentJobPost;
  setJobPost: () => void;
  handleGoTo: (direction: Direction) => void;
};

export const JobPostStep1 = ({ jobPost, setJobPost, handleGoTo }: Props) => {
  const [image, setImage] = useState(jobPost.company_avatar || defaultImage);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      company_name: jobPost.company_name,
      job_desc: jobPost.job_desc,
    },
    resolver: yupResolver(schema),
  });

  const handleNext = (data) => {
    const newJobPost = {
      ...jobPost,
      company_avatar: image,
      company_name: data.company_name,
      job_desc: data.job_desc,
    };
    setJobPost(newJobPost);
    handleGoTo("next");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Cuentanos sobre la vacante</Text>
          <Text style={styles.subtitle}>
            Completa los detalles del puesto requerido para encontrar al
            candidato ideal..
          </Text>
          <View style={styles.row}>
            <Image source={{ uri: image }} style={styles.image} />
            <Ionicons name="folder-outline" size={24} color="#ff000" />

            <TouchableOpacity onPress={() => pickImage(setImage)}>
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: "underline",
                  fontWeight: "500",
                  marginLeft: 10,
                }}
              >
                Cargar foto de perfil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomInput
          name="company_name"
          label="Nombre de la empresa"
          control={control}
          placeholder="Escribe el nombre de la empresa"
        />
        <CustomInput
          name="job_desc"
          label="Describe la posición buscada"
          control={control}
          placeholder="Escribe una descripción de la posición"
          multiline
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit(handleNext)}>
          <View style={styles.buttonStyles}>
            <Entypo name="arrow-right" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.screenBg,
  },
  header: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 45,
    resizeMode: "contain",
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    paddingHorizontal: 10,
    marginBottom: 10,
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
