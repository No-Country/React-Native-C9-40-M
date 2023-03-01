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
import { useNavigation } from "@react-navigation/native";
import logo from "../../../../../assets/images/logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { UserContext } from "../../../../GlobalStates/userContext";

import { CustomInput } from "../../../common/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../../utils/validationSchema/basicUserData";
import { useUpdateUser } from "../../../../hooks/useUpdateUser";
import { ROUTES } from "../../../../constants";
import CustomNavigateButton from "../../../common/CustomNavigateButton";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const SecondRecruiter = ({ step, handleGoTo }: Props) => {
  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleNext = async (data) => {
    // navigation.navigate(ROUTES.HOME_RECRUITER_DRAWER);
    handleGoTo("next1");
  };
  const handleBack = () => {
    handleGoTo("prev");
  };

  type FormValues = {
    empresa: string;
    descripcion: string;
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      empresa: currentUser.empresa,
      descripcion: currentUser.descripcion,
    },

    // resolver: yupResolver(schema),
  });

  {
    /*---------Funcion para subir imagen  */
  }
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

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (

    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.imagenLogo}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.menu}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            lineHeight: 36,
            letterSpacing: 1,
            color: "#0E1545",
            padding: 15,
          }}
        >
          Cuentanos sobre tu trabajo
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
            style={{ maxWidth: "100%", marginHorizontal: 10, marginTop: 15 }}
          >

            <TouchableOpacity onPress={openImage}>
              <Text
                style={{
                  fontSize: 17,
                  textDecorationLine: "underline",
                  fontWeight: "500",
                  marginLeft: 15,
                  color: "#080909",
                }}
              >
                Nombre de la empresa
              </Text>
            </TouchableOpacity>

          </View>


        <View style={styles.inputContainer}>
          <CustomInput
            name="company_url_linkedin"
            label="LinkedIn de la empresa"
            control={control}
            placeholder="URL de Linkedin"
          />

          <CustomInput
            name="company_url_web"
            label="Web de la empresa"
            control={control}
            placeholder="URL de la empresa"
          />

          <CustomInput
            name="company_phone"
            control={control}
            label="Teléfono de la empresa"
            placeholder="Teléfono de contacto"
          />
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
  logo: {
    height: 64,
    width: 128,
  },
  imagenLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
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

  circleImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D9D9D9",
    elevation: 10,

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
