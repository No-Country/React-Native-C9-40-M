import { useContext, useEffect, useState } from "react";
import { Button, View, StyleSheet, Text, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../GlobalStates/userContext";
import OffersCard from "../../components/pages/homeUsers/OffersCard";
import { useGetJobSeekers } from "../../hooks/useGetJobSeekers";
import { COLORS, ROUTES } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { JobSeekerCard } from "../../components/pages/jobSeekers/JobSeekerCard";

export function HomeRecuiter() {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const [isLoad, setIsLoad] = useState(false);
  const [jobSeekers, setJobSeekers] = useState([]);
  const userName =
    currentUser.firstname === null ? currentUser.email : currentUser.firstname;

  const fetchJobSeekers = async () => {
    const jobSeeker = await useGetJobSeekers();
    setJobSeekers(jobSeeker);
    setIsLoad(true);
    return jobSeeker;
  };

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  console.log("estos son los usuario");

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            <Text style={styles.bold}>¡Hola</Text>, {userName} bienvenido!
          </Text>
          <Text style={styles.subtitle}>
            Estas son los postulados a tus trabajos
          </Text>
        </View>

        {isLoad && (
          <View>
            <FlatList
              data={jobSeekers}
              horizontal={true}
              renderItem={({ item }) => <JobSeekerCard user={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {isLoad === false && <Text>Cargando</Text>}
        {/* {isLoad && jobsBD.length > 0 && (
        )} */}
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
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.screenBg,
  },
  headerContainer: {
    marginTop: 20,
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
