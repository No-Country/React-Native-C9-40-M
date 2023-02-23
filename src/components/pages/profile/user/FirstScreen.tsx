import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../../utils/validationSchema/basicUserData";

import logo from "../../assets/images/logo.png";
import { CustomButton } from "../../../common/CustomButton";
import { CustomInput } from "../../../common/CustomInput";
import { COLORS } from "../../../../constants";
import { UserContext } from "../../../../GlobalStates/userContext";
import { useUpdateUser } from "../../../../hooks/useUpdateUser";

{
  /*---------------TYPES-------------------- */
}
type FormValues = {
  nombre: string;
  apellido: string;
  telefono: string;
  pais: string;
  ciudad: string;
};

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const FirstScreen = ({ step, handleGoTo }: Props) => {
  const { currentUser, setCurrentUser, path, setPath } =
    useContext(UserContext);
  const [error, setError] = useState();

  {
    /*----------------Funcion next-------------- */
  }
  const handleNext = async (data) => {
    // Actualiza el usuario actual en el estado global
    setCurrentUser({
      ...currentUser,
      firstname: data.nombre,
      lastname: data.apellido,
      phone: data.telefono,
      country: data.pais,
      region: data.ciudad,
    });

    // Actualiza el usuario en la base de datos
    const dataBasic = {
      firstname: data.nombre,
      lastname: data.apellido,
      phone: data.telefono,
      country: data.pais,
      region: data.ciudad,
      avatar: selectedImage,
      token: currentUser.token,
    };

    const respuestaUpdate = await useUpdateUser(dataBasic);

    if (path == 1 || path == 2) {
      if (respuestaUpdate === "ok") {
        handleGoTo("next");
      } else {
        console.warn("Ups hubo un error!");
      }
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
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
      nombre: currentUser.firstname,
      apellido: currentUser.lastname,
      pais: currentUser.country,
      ciudad: currentUser.region,
      telefono: currentUser.phone,
    },

    resolver: yupResolver(schema),
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

  useEffect(() => {
    setPath(0);
  }, []);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.titleText}>Cuentanos de tí</Text>
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
      </View>
      <View style={styles.formContainer}>
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
          <TouchableOpacity onPress={() => setPath(1)}>
            <Ionicons
              style={styles.icon}
              name="people-outline"
              size={32}
              color="#ff000"
            />
            <Text>Soy Reclutador</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPath(2)}>
            <Ionicons
              style={styles.icon}
              name="search-outline"
              size={32}
              color="#ff000"
            />
            <Text>Busco Empleo</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          {error ? (
            <Text style={{ color: "#AA1E1E", position: "absolute", top: 20 }}>
              Debes elegir una opción para continuar
            </Text>
          ) : (
            ""
          )}
        </View>

        <View style={{ marginTop: 50 }}>
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
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    background: "#D9D9D9",
  },
  header: {
    flex: 1,
  },
  titleText: {
    fontStyle: "normal",
    fontWeight: "500",
    color: "#0E1545",
    width: 301,
    height: 50,
    top: 21,
    left: 18,
    fontSize: 24,
    letterSpacing: -0.011,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 150,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 75,
    resizeMode: "contain",
    marginleft: 20,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
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
