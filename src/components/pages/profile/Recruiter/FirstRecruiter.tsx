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
import CustomTextArea from "../../../common/CustomTextArea";

import { useUpdateUser } from "../../../../hooks/useUpdateUser";
import { CustomTextInput } from "../../../common/CustomTextInput";

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

  const handleNext = (data) => {
    console.log("que viene", data);
    if (!description && !name) {
      setErrors(true);
      setTimeout(() => {
        setErrors(false);
      }, 3000);
    }
    handleGoTo("next");
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
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.menu}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            lineHeight: 36,
            letterSpacing: 1,
            color: "#0E1545",
            marginHorizontal: 30,
            marginVertical: 5,
          }}
        >
          Cuentanos sobre tu trabajo.
        </Text>
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
            style={{ display: "flex", flexDirection: "row", marginLeft: "7%" }}
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

        <View style={styles.inputContainer}>
          <CustomInput
            name="nombre"
            label="Nombre de la empresa"
            control={control}
            placeholder="Escriba el nombre de la empresa"
          />

          <CustomTextArea title="Texto" placeholder="Ingrese un texto" />
        </View>
      </View>

      {keyboardShown && (
        <KeyboardAvoidingView
          style={{ display: "none" }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={1000} // ajusta este valor para hacer que el elemento desaparezca
        ></KeyboardAvoidingView>
      )}
      {!keyboardShown && (
        <View style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* Contenido visible cuando el teclado no está activo */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setFreelancer(!freelancer)}>
              <View style={styles.buttonFreelance}>
                <View style={{ position: "relative" }}>
                  <Ionicons name="radio-button-off" size={24} color="#C27B34" />
                  {freelancer ? (
                    <Ionicons
                      name="radio-button-on"
                      size={24}
                      color="#C27B34"
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  ) : (
                    ""
                  )}
                </View>
                <Text style={styles.freelancerText}>Soy Freelancer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit(handleNext)}>
              <View style={styles.buttonStyles}>
                <Entypo name="arrow-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    marginTop: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  menu: {
    display: "flex",
    alignItems: "flex-start",
    flex: 1,
  },

  titleText: {
    fontStyle: "normal",
    fontWeight: "600",
    color: "#0E1545",
    height: 50,
    fontSize: 24,
    lineHeight: "150%",
    letterSpacing: 0.01,
  },

  empresaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginVertical: 5,
    marginHorizontal: 25,
  },
  circleImage: {
    width: 80,
    height: 80,
    borderRadius: 35,
    backgroundColor: "#E9EBF4",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 5,
  },
  icon: {
    textAlign: "center",
  },

  inputContainer: {
    marginBottom: "-3%",
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F6F7;",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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

  freelancerText: {
    height: 24,
    fontSize: 16,
    color: " #0E1545",
  },

  buttonFreelance: {
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 16,
    width: 220,
    height: 56,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
  },
});
