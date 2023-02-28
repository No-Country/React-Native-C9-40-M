import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SelectDropdown } from "../../common/CustomDropdown";
import { COLORS } from "../../../constants";

type Direction = {
  direction: "next" | "prev";
};

type Props = {
  jobPost: CurrentJobPost;
  setJobPost: () => void;
  handleGoTo: (direction: Direction) => void;
};

export const ZeroStep = ({ jobPost, setJobPost, handleGoTo }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState(null);

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

  const handleNext = async () => {
    //if everything right go to next screen
    const newJobPost = { jobPost };
    setJobPost(newJobPost);
    handleGoTo("next");

    // const respuestaUpdate = await usePostJob(jobPostData);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <View style={styles.header}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <Text style={styles.title}>Cuentanos sobre tu trabajo</Text>
          <View style={styles.row}>
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
              <Ionicons name="folder-outline" size={27} color="#ff000" />

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
        </View>

        <Text style={styles.title}>¿Qué rol estas buscando?</Text>
        <Text style={styles.subtitle}>
          Cuéntanos cual es el rol que más te identifica el pérfil que estas
          búscando
        </Text>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            {selectedRol
              ? `El perfil buscado es ${selectedRol}`
              : "¿Qué perfil buscas?"}
          </Text>

          <View>
            <SelectDropdown
              value={selectedRol}
              data={allRol}
              onSelect={setSelectedRol}
            />
          </View>

          {errorMsg && (
            <View style={styles.errorMsg}>
              <Text style={styles.errorText}> {errorMsg}</Text>
            </View>
          )}
        </View> */}
      </ScrollView>
      {/* <View style={styles.buttonContainer}>
        {selectedRol && (
          <TouchableOpacity onPress={() => handleNext()}>
            <View style={styles.buttonStyles}>
              <Entypo name="arrow-right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
  },
  header: {
    backgroundColor: COLORS.dangerLight,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 75,
    resizeMode: "contain",
    marginleft: 20,
    marginBottom: 20,
  },
  menu: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "300",
    paddingHorizontal: 10,
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
