import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import image from "../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "./CustomButton";
import { CustomInput } from "./CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../utils/validationSchema/getCV";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants";
import { useContext } from "react";
import { UserContext } from "../GlobalStates/userContext";
import * as ImagePicker from "expo-image-picker";

{
  /*---------------TYPES-------------------- */
}
type FormValues = {
  nombre: string;
};

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const FirstScreen = ({ step, handleGoTo }: Props) => {
  {
    /*----------------Funcion next-------------- */
  }
  const handleNext = (data) => {

    console.log(data);
    setCurrentUser({
      ...currentUser,
      firstname: data.nombre,
      lastname: data.apellido,
    });
    const dataBasic = {
      firstname: data.nombre,
      lastname: data.apellido,
      phone: data.telefono,
      country: data.pais,
      avatar: selectedImage,
    };
    const respuestaUpdate = useUpdateUser(dataBasic);
    if (respuestaUpdate.status === "ok") {
      handleGoTo("next");
    } else {
      console.warn("Ups hubo un error!");
    }

  };

  {
    /*-----------Funcion de formulario------------ */
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nombre: "",
      apellido: "",
      pais: "",
      ciudad: "",
      telefono: "",
    },

    //resolver: yupResolver(schema),
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
    setSelectedImage({ localUri: pickRe.uri });
    console.log(selectedImage);
  };

  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>Cuentanos de tí</Text>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://www.pngitem.com/pimgs/m/499-4992374_sin-imagen-de-perfil-hd-png-download.png",
          }}
          style={styles.image}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 20,
          }}
        >
          <Ionicons
            style={styles.icon}
            name="folder-outline"
            size={27}
            color="#ff000"
          />
          <TouchableOpacity onPress={openImage}>
            <Text
              style={{
                fontSize: 21,
                textDecorationLine: "underline",
                fontWeight: "500",
              }}
            >
              Cargar foto de perfil
            </Text>
          </TouchableOpacity>
        </View>
        <CustomInput
          name="nombre"
          label="Nombre *"
          control={control}
          placeholder="Ingresa tu nombre"
        />
        <CustomInput
          name="apellido"
          label="Apellido *"
          control={control}
          placeholder="Ingresa tu apellido"
        />
        <CustomInput
          name="pais"
          label="País *"
          control={control}
          placeholder="Ingresa tu país de residencia"
        />
        <CustomInput
          name="ciudad"
          label="Ciudad/Región *"
          control={control}
          placeholder="Ingresa tu ciudad o región de residencia"
        />
        <CustomInput
          name="telefono"
          label="Teléfono *"
          control={control}
          placeholder="Ingresa tu número de teléfono"
          keyboardType="numeric"
        />
        <View style={styles.btnLine}>
          <TouchableOpacity>
            <Ionicons
              style={styles.icon}
              name="people-outline"
              size={32}
              color="#ff000"
            />
            <Text>Soy Reclutador</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              style={styles.icon}
              name="search-outline"
              size={32}
              color="#ff000"
            />
            <Text>Busco Empleo</Text>
          </TouchableOpacity>
        </View>

        <View>
          <CustomButton
            onPress={handleSubmit(handleNext)}
            text="Continuar"
            bgColor={COLORS.logoBlue}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignSelf: "center",
    padding: 20,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 150,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    color: "black",
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "700",
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    textAlign: "center",
  },
});
