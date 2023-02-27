import { useContext, useEffect, useState } from "react";
import {
  Button,
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../GlobalStates/userContext";
import { COLORS, ROUTES } from "../../constants";
import { OffersCard } from "../../components/pages/homeUsers/OffersCard";
import { OffersDetail } from "../../components/pages/homeUsers/OffersDetail";
import { useGetJobs } from "../../hooks/useGetJobs";

export function HomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const [isLoad, setIsLoad] = useState(false);
  const [jobsBD, setJobsBD] = useState([]);

  const fetchJobs = async () => {
    const jobs = await useGetJobs();
    setJobsBD(jobs);
    setIsLoad(true);
    return jobs;
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.subtitle}>
          <Text style={styles.bold}>¡Hola </Text>Estas son las vacantes
          disponibles según tu perfil.{" "}
          <Text style={styles.bold}>¡Muchos Éxitos!</Text>
        </Text>
      </View>

      {isLoad && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={jobsBD}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OffersCard job={item} />}
          />
        </View>
      )}
      {isLoad === false && <Text>Cargando</Text>}

      {/* <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.navigate(ROUTES.LANDING);
            }}
            title="Cerrar Sesión"
            color="purple"
            accessibilityLabel="Learn more about this"
          />
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "600",
    color: COLORS.primary,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 5,
  },
});
