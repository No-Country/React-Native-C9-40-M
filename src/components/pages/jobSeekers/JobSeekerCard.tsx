import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CARD } from "../../../constants/constants";

import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
type UserRols = {
  rol_id: number;
  rol: {
    name: string;
  };
};
type UserTecnologies = {
  tecnology_id: number;
  years_tecnology: number;
  tecnology: {
    name: string;
  };
};
type Projects = {
  id: number;
  user_id: number;
  title_project: string;
  description: string;
  featured: boolean;
  url: string;
  image: string;
  partnership: boolean;
};

type JobSeekerCardProps = {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string | null;
    about_me: string | null;
    article_1: string | null;
    url_github: string | null;
    url_linkedin: string | null;
    age: number;
    country: string;
    region: string;
    is_verify: boolean;
    phone: string;
    user_rols: UserRols[];
    user_tecnologies: UserTecnologies[];
    projects: Projects[];
    repositories: any[];
  };
};
export const JobSeekerCard = ({ user }: JobSeekerCardProps) => {
  const {
    avatar,
    firstname,
    lastname,
    user_rols,
    region,
    country,
    user_tecnologies,
    url_github,
    url_linkedin,
  } = user;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri:
                avatar ||
                "https://www.pngitem.com/pimgs/m/499-4992374_sin-imagen-de-perfil-hd-png-download.png",
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>
              {firstname} {lastname}
            </Text>
            <Text style={styles.rol}>{user_rols[0]?.rol.name}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Pressable
            style={styles.detailButton}
            onLongPress={() => alert("ver detalle")}
          >
            <Text style={styles.button}>Detalle</Text>
          </Pressable>
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
          {user_tecnologies.map((tec) => (
            <Text style={styles.textTecnology} key={tec.tecnology_id}>
              {tec.tecnology.name}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 330,
    height: 400,
    backgroundColor: COLORS.cardBg,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    width: "100%",
  },
  rol: {
    color: COLORS.primary,
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
  detailButton: {
    position: "absolute",
    right: 0,
    top: -50,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: COLORS.white,
  },
  body: { padding: 10, marginBottom: 10 },
  mr8: {
    marginRight: 8,
  },
  sb: {},
  textTecnology: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.onPress,
    color: COLORS.white,
    borderRadius: 5,
    marginRight: 10,
  },
});
