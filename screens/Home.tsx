import { useContext, useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../GlobalStates/userContext';
import OffersCard from '../components/OffersCard';
import { useGetJobs } from '../hooks/useGetJobs';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

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

  console.log('fuera del useeEFfect', isLoad, jobsBD[0]);
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            <Text style={styles.bold}>¡Hola</Text>, {userName} bienvenido!
          </Text>
          <Text style={styles.subtitle}>
            Estas son las vacantes disponibles
          </Text>
          <Text style={styles.text}>
            Para que tengas vacantes más alineadas{' '}
            <Text style={styles.bold}>Crea tu perfil</Text>
          </Text>
        </View>

        {isLoad && (
          <View>
            <FlatList
              data={jobsBD}
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
        {/* {isLoad && jobsBD.length > 0 && (
        )} */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.navigate('Landing');
            }}
            title="Cerrar Sesión"
            color="purple"
            accessibilityLabel="Learn more about this"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  bold: {
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
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
