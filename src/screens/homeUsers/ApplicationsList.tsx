import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import { UserContext } from "../../GlobalStates/userContext";
import { COLORS } from "../../constants";
import { useGetApplicationJobs } from "../../hooks/useGetApplicationJobs";
import { ApplicationCard } from "../../components/pages/application/ApplicationCard";

export function ApplicationsList() {
  const { currentUser } = useContext(UserContext);
  const [isLoad, setIsLoad] = useState(false);
  const [applications, setApplications] = useState([]);

  const fetchJobs = async () => {
    const jobs = await useGetApplicationJobs(currentUser.token);
    setApplications(jobs);
    setIsLoad(true);
    return jobs;
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Tus postulaciones</Text>
        <Text style={styles.text}>
          Aquí puedes ver el estado de tus postulaciones.
        </Text>
      </View>

      {isLoad && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={applications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ApplicationCard job={item.job} />}
          />
        </View>
      )}
      {isLoad === false && <Text>Cargando</Text>}
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
