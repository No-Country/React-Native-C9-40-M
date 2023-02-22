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
// import { schema } from "../utils/validationSchema/basicUserData";

import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { COLORS } from "../../constants";
import { UserContext } from "../../GlobalStates/userContext";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useTechRol } from "../../hooks/useTechRol";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";

{
  /*---------------TYPES-------------------- */
}
type Direction = {
  direction: "next" | "prev";
};

type Props = {
  step: number;
  jobPost: CurrentJobPost;
  setJobPost: () => void;
  handleGoTo: (direction: Direction) => void;
};

export const FirstStep = ({ step, jobPost, setJobPost, handleGoTo }: Props) => {
  const { currentUser } = useContext(UserContext);
  const [seletedRol, setSelectedRol] = useState(jobPost.job_offered);
  const [selectedItems, setSelectedItems] = useState(jobPost.job_requirements);
  const [allRolTec, setSAllRolTec] = useState([]);

  useEffect(() => {
    const getRol = async () => {
      const response = await useTechRol();
      setSAllRolTec(response);
    };
    getRol();
  }, []);

  console.log(
    "Son los roles tecnologiia existente",
    allRolTec.map((rol) => rol.rol_tecnology)
  );

  // console.log(
  //   "Son los las tecnologias de un rol",
  //   allRolTec.filter((rol) => rol.name === "Front-End")[0].rol_tecnology
  // );

  const handleNext = async (data) => {
    // update jobPost in the Database
    const jobPostData = {
      company_avatar: data.company_name,
      company_desc: data.company_desc,
      company_url_linkedin: data.company_url_linkedin,
      company_url_web: data.commpany_url_web,
      company_phone: data.company_phone,
      job_offered: data.job_offered,
      job_desc: data.job_desc,
      job_requirements: data.job_requirements,
      job_country: data.job_country,
      job_work_place: data.job_work_place,
      job_working_day: data.job_working_day,
      token: currentUser.token,
    };

    const respuestaUpdate = await usePostJob(jobPostData);

    if (respuestaUpdate === "ok") {
      handleGoTo("next");
    } else {
      console.warn("Ups hubo un error!");
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CurrentJobPost>({
    defaultValues: {
      company_avatar: jobPost.company_name,
      company_desc: jobPost.company_desc,
      company_url_linkedin: jobPost.company_url_linkedin,
      company_url_web: jobPost.company_url_web,
      company_phone: jobPost.company_phone,
      job_offered: jobPost.job_offered,
      job_desc: jobPost.job_desc,
      job_requirements: jobPost.job_requirements,
      job_country: jobPost.job_country,
      job_work_place: jobPost.job_work_place,
      job_working_day: jobPost.job_working_day,
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
    setSelectedImage({ localUri: pickRe.uri });
    console.log(selectedImage);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <View>
          <Text style={styles.titleText}>¿Qué rol estas buscando?</Text>
          <Text style={styles.text}>Crea una nueva vacante</Text>

          <View style={styles.inputContainer}>
            <SelectList
              setSelected={(val) => setSelectedRol(val)}
              data={allRolTec.map((rol) => rol.name)}
              boxStyles={styles.dropdown}
              dropdownStyles={styles.dropdown}
              checkBoxStyles={styles.checkbox}
              dropdownTextStyles={styles.textCheckbox}
              badgeStyles={{ backgroundColor: "#27358F" }}
              placeholder="Selecciona una opción"
              searchPlaceholder={"Busca tu rol en el mundo IT"}
              maxHeight={200}
              notFoundText="No se encontro ningun rol"
            />
          </View>
          <Text>{seletedRol}</Text>
          {seletedRol && (
            <MultipleSelectList
              setSelected={(val) => setSelectedStack(val)}
              data={tech}
              save="value"
              dropdownStyles={styles.dropdown}
              boxStyles={styles.dropdown}
              checkBoxStyles={styles.checkbox}
              dropdownTextStyles={styles.textCheckbox}
              badgeStyles={{ backgroundColor: "#27358F" }}
              labelStyles={styles.stackText}
              label="Tu Stack:"
              placeholder="Selecciona tu stack de tecnologías"
              searchPlaceholder="Busca tus tecnologías"
              maxHeight={205}
              notFoundText="No se encontro ningun rol"
            />
          )}
        </View>
      </ScrollView>
      <View>
        {/* Contenido visible cuando el teclado no está activo */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleNext()}>
            <View style={styles.buttonStyles}>
              <Entypo name="arrow-right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  menu: {
    flex: 1,
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
    color: "#0E1545",
    width: 301,
    height: 50,
    top: 21,
    left: 18,
    fontSize: 24,
    letterSpacing: -0.011,
    marginBottom: 20,
  },
  inputContainer: {
    zIndex: 100,
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  text: {
    fontSize: 18,
    paddingLeft: 18,
  },

  inputText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  descriptionText: {
    fontStyle: "normal",
    top: 24,
    left: 20,
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

  dropdown: {
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

  dropdownError: {
    backgroundColor: "#AA1E1E",
    borderRadius: 16,
    borderColor: "none",
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

  inputError: {
    backgroundColor: "#AA1E1E",
    height: 2,
    top: 10,
  },

  textCheckbox: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
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
