import * as ImagePicker from "expo-image-picker";
export const pickImage = async (setImage) => {
  let permissionRe = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionRe.granted === false) {
    alert("Los permisos para acceder a la camara son requeridos");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
