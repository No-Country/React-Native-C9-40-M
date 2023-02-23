import React, { useContext, useState } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../../../../utils/validationSchema/getCV";

import { CustomInput } from "../../../common/CustomInput";
import { UserContext } from "../../../../GlobalStates/userContext";
import { useUpdateUser } from "../../../../hooks/useUpdateUser";

import logo from "../../assets/images/logo.png";

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

export const FourScreen = ({ handleGoTo }: Props) => {
  const { currentUser } = useContext(UserContext);
  //para probar cuando viene un valor en el currentUser

  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const [fileLoadMsg, setFileLoadMsg] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      url_portfolio: currentUser.url_portfolio,
      gitUrl: currentUser.portfolio, // hay que cambiar luego
    },
    resolver: yupResolver(schema),
  });

  // Funcion que sube el documento por ahora solo pdf
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type === "success") {
      setFile(result);
    }
  };

  // Funcion que manda el documanto al backend
  const uploadFile = async () => {
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("file", {
      uri: file.uri,
      name: file.name,
      type: "application/pdf",
    } as Document);

    const response = await fetch("http://your-server.com/upload", {
      method: "POST",
      body: data,
    });

    console.log(await response.json());
  };

  const handleCV = async (data: FormValues) => {
    if (!file) {
      setFileLoadMsg("Debe de subir su CV");
      return;
    }
    setFileLoadMsg("");
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
        <Text style={styles.title}>Completa tu perfil</Text>
        <Text style={styles.subtitle}>
          El último paso para que puedas encontrar tu trabajo ideal.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.field}>
          <Text style={styles.label}>Adjunta tu CV</Text>
          <Button title="Seleccionar archivo" onPress={pickDocument} />
          {fileLoadMsg && (
            <View style={styles.errorMsg}>
              <Text style={styles.error}>{fileLoadMsg || "Error"}</Text>
            </View>
          )}
          {file && <Text> {file.name}</Text>}
        </View>

        <CustomInput
          name="url_portfolio"
          label="LinkedIn"
          control={control}
          placeholder="Pega aqui el URL de tu perfil"
        />
        <CustomInput
          name="gitUrl"
          label="GitHub / Behance"
          control={control}
          placeholder="Pega aqui el URL de tu perfil"
        />

        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleBack}>
              <View style={styles.buttonStyles}>
                <Entypo name="arrow-left" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit(handleCV)}>
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
    fontSize: 26,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    paddingHorizontal: 10,
    textAlign: "left",
    marginBottom: 20,
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
