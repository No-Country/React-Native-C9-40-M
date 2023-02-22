import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CARD } from "../constants/constants";

import { FontAwesome, Fontisto } from "@expo/vector-icons";

type JobSeekerCardProps = {
  avatar: string;
  firstname: string;
  lastname: string;
  region: string;
  country: string;
  url_linkedin: string;
  url_github: string;
  rol: string[];
};
export const JobSeekerCard = ({
  avatar,
  firstname,
  lastname,
  rol,
  region,
  country,
  url_github,
  url_linkedin,
}: JobSeekerCardProps) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>
              {firstname} {lastname}
            </Text>
            <Text>{rol?.rol?.name}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.mr8}>
              <Fontisto name="world-o" size={24} color="black" />
            </View>
            <Text>
              {region}, {country}
            </Text>
          </View>
          <View style={[styles.row]}>
            <View style={styles.mr8}>
              <FontAwesome name="linkedin-square" size={24} color="black" />
            </View>
            <Text>{url_linkedin}</Text>
          </View>
          <View style={[styles.row]}>
            <View style={styles.mr8}>
              <FontAwesome name="github-square" size={24} color="black" />
            </View>

            <Text>{url_github}</Text>
          </View>
          <View style={[styles.row]}>
            <View style={styles.mr8}>
              <FontAwesome name="folder-open-o" size={24} color="black" />
            </View>

            <Text>Descargar</Text>
          </View>
        </View>
        <View style={[styles.row, styles.sb]}>
          {rol?.user_tecnologies.map((tec) => (
            <Text style={styles.textTecnology} key={tec.tecnology_id}>
              {tec.name}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 400,
    backgroundColor: "#D9D9D9",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#273469",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  body: { padding: 10, marginBottom: 10 },
  mr8: {
    marginRight: 8,
  },
  sb: {},
  textTecnology: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#686F82",
    borderRadius: 5,
    marginRight: 10,
  },
});
