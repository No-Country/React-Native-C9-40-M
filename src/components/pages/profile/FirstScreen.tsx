import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../utils/validationSchema/basicUserData";

import { pickImage } from "../../../utils/pickImage";
import { CustomButton } from "../../common/CustomButton";
import { CustomInput } from "../../common/CustomInput";
import { COLORS } from "../../../constants";
import { UserContext } from "../../../GlobalStates/userContext";
import { useUpdateUser } from "../../../hooks/useUpdateUser";

const defaultImage =
  "https://www.pngitem.com/pimgs/m/499-4992374_sin-imagen-de-perfil-hd-png-download.png";

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
  const { currentUser, setCurrentUser, setPath } = useContext(UserContext);

  const [image, setImage] = useState(currentUser.avatar || defaultImage);

  const defaultStatus = currentUser.status || "user";
  const [chosenOption, setChosenOption] = useState(defaultStatus);
  const options = [
    { label: "Ofrezco Empleo", value: "recruiter" },
    { label: "Busco Empleo", value: "user" },
  ];

  {
    /*----------------Funcion next-------------- */
  }
  const handleNext = async (data) => {
    if (chosenOption === "recruiter") {
      setPath(1);
    } else {
      setPath(2);
    }
    // Actualiza el usuario actual en el estado global
    setCurrentUser({
      ...currentUser,
      firstname: data.nombre,
      lastname: data.apellido,
      phone: data.telefono,
      country: data.pais,
      region: data.ciudad,
      status: chosenOption,
      avatar: image,
    });
    // Actualiza el usuario en la base de datos
    const dataBasic = {
      firstname: data.nombre,
      lastname: data.apellido,
      phone: data.telefono,
      country: data.pais,
      region: data.ciudad,
      avatar: image,
      status: chosenOption,
      token: currentUser.token,
    };

    const respuestaUpdate = await useUpdateUser(dataBasic);

    if (respuestaUpdate === "ok") {
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

  return (
    <ScrollView>
      <Text style={styles.titleText}>Cuentanos de tí</Text>
      <View style={styles.ImagePicker}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textImage}>
          <TouchableOpacity onPress={() => pickImage(setImage)}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: COLORS.primary,
              }}
            >
              Sube una foto
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <RadioForm
          style={styles.btnLine}
          buttonColor={COLORS.gold}
          labelStyle={{
            fontWeight: "bold",
            color: COLORS.logoBlue,
          }}
          selectedButtonColor={COLORS.gold}
          radio_props={options}
          initial={defaultStatus === "recruiter" ? 2 : 1} //initial value of this group
          onPress={(value) => {
            setChosenOption(value);
          }} //if the user changes options, set the new value
        />
      </View>
      <View style={styles.formContainer}>
        <CustomInput
          name="nombre"
          label="Nombre *"
          control={control}
          placeholder="¿Cuál es tu nombre?"
        />
        <CustomInput
          name="apellido"
          label="Apellido *"
          control={control}
          placeholder="¿Cuál es tu apellido?"
        />
        <CustomInput
          name="pais"
          label="País *"
          control={control}
          placeholder="¿En qué país vives?"
        />
        <CustomInput
          name="ciudad"
          label="Ciudad/Región *"
          control={control}
          placeholder="¿En qué ciudad o región vives?"
        />
        <CustomInput
          name="telefono"
          label="Teléfono *"
          control={control}
          placeholder="¿Cuál es tu número de contacto?"
          keyboardType="name-phone-pad"
        />

        <View style={{ marginBottom: 50 }}>
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
  imagenLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontStyle: "normal",
    fontWeight: "500",
    color: COLORS.primary,
    width: 300,
    height: 50,
    top: 20,
    left: 18,
    fontSize: 24,
    marginBottom: 50,
    marginTop: 20,
  },
  logo: {
    height: 64,
    width: 128,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 25,
  },
  icon: {
    textAlign: "center",
  },
  ImagePicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textImage: {
    marginTop: 50,
    marginRight: 100,
  },
});
