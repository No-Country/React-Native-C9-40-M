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
import OffersCard from "../../components/OffersCard";
import { useGetJobs } from "../../hooks/useGetJobs";
import { ROUTES } from "../../constants";

export function HomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const [isLoad, setIsLoad] = useState(false);
  const [jobsBD, setJobsBD] = useState([]);
  const userName =
    currentUser.firstname === null ? currentUser.email : currentUser.firstname;

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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            <Text style={styles.bold}>¡Hola</Text>, {userName} bienvenido!
          </Text>
          <Text style={styles.subtitle}>
            Estas son las vacantes disponibles
          </Text>
          <Text style={styles.text}>
            Para que tengas vacantes más alineadas{" "}
            <Text style={styles.bold}>Manten tu perfil actualizado</Text>
          </Text>
        </View>

        {isLoad && (
          <View>
            <FlatList
              data={jobsBD}
              horizontal={true}
              renderItem={({ item }) => (
                <OffersCard
                  title={item.title}
                  company={item.company?.name}
                  description={item.description}
                  work_place={item.work_place}
                  working_day={item.working_day}
                  country={item.country}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {isLoad === false && <Text>Cargando</Text>}

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.navigate(ROUTES.LANDING);
            }}
            title="Cerrar Sesión"
            color="purple"
            accessibilityLabel="Learn more about this"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "700",
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
