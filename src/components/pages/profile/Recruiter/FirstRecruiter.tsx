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
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { UserContext } from "../../../../GlobalStates/userContext";
import logo from "../../../assets/images/logo.png";
import { CustomInput } from "../../../common/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../../utils/validationSchema/basicUserData";
import { CustomTextArea } from "../../../common/CustomTextArea";

import { useUpdateUser } from "../../../../hooks/useUpdateUser";
import { CustomTextInput } from "../../../common/CustomTextInput";
import CustomNavigateButton from "../../../common/CustomNavigateButton";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const FirstRecruiter = ({ step, handleGoTo }: Props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [freelancer, setFreelancer] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleNext = (data) => {
    handleGoTo("next");
  };

  const handleBack = () => {
    handleGoTo("prev");
  };

  {
    /*-----------Funcion de formulario------------ */
  }

  type FormValues = {
    empresa: string;
    descripcion: string;
  };

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<FormValues>({
    defaultValues: {
      empresa: currentUser.empresa,
      descripcion: currentUser.descripcion,
    },
    // resolver: yupResolver(schema),
  });

  const [selectedImage, setSelectedImage] = useState(null);

  let openImage = async () => {
    let permissionRe = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionRe.granted === false) {
      alert("Los permisos para acceder a la camara son requeridos");
      return;
    }

    const pickRe = await ImagePicker.launchImageLibraryAsync();

    if (pickRe.canceled === true) {
      return;
    }

    setSelectedImage({ localUri: pickRe.assets[0].uri });
    console.log(selectedImage);
  };

  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <View>
          <Text style={styles.titleText}>Nombre de la empresa</Text>
          <View style={styles.empresaContainer}>
            <Image
              source={{
                uri:
                  selectedImage !== null
                    ? selectedImage.localUri
                    : "https://www.pngiteme.com/pimgs/m/499-4992374_sin-imagen-de-perfil-hd-png-download.png",
              }}
              style={styles.circleImage}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "7%",
              }}
            >
              <Ionicons
                style={styles.icon}
                name="folder-outline"
                size={24}
                color="#ff000"
              />

              <TouchableOpacity onPress={openImage}>
                <Text
                  style={{
                    fontSize: 15,
                    textDecorationLine: "underline",
                    fontWeight: "500",
                    marginLeft: 15,
                  }}
                >
                  Cargar foto de perfil
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ maxWidth: "100%", marginHorizontal: 10, marginTop: 15 }}
          >
            <View style={{ maxWidth: "98%" }}>
              <CustomInput
                name="nombre"
                label="Nombre de la empresa"
                control={control}
                placeholder="Escriba el nombre de la empresa"
              />
            </View>

            <View style={{ marginLeft: 10 }}>
              <CustomTextArea
                title="Descripción"
                placeholder="Escribe una breve descripción de la empresa..."
                value={description}
                placeholder="Ingrese una descripción"
              />
            </View>
          </View>

          <View style={styles.inputContainer}></View>
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
    justifyContent: "center",
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
    height: 80,
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 25,
    letterSpacing: -0.011,
    lineHeight: 30,
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

  inputError: {
    backgroundColor: "#AA1E1E",
    height: 2,
    top: 10,
  },

  empresaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  circleImage: {
    borderRadius: 45,
    width: 90,
    height: 90,
    backgroundColor: "#E9EBF4",
    shadowOffset: { width: 49, height: 40 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    elevation: 4,
  },
  icon: {
    textAlign: "center",
  },

  textCheckbox: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
  },
});
