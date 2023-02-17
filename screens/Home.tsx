import { useContext, useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../GlobalStates/userContext';
import OffersCard from '../components/OffersCard';
import { useGetJobs } from '../hooks/useGetJobs';

export function HomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const [isLoad, setIsLoad] = useState(false);
  const [jobsBD, setJobsBD] = useState([]);
  const userName =
    currentUser.firstname === null ? currentUser.email : currentUser.firstname;

  const jobs = useGetJobs();

  console.log(jobs);

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
        {/* <Text>{jobsBD[0].id}</Text>
        <Text>{jobsBD[0].title}</Text>
        <Text>{jobsBD[0].description}</Text>
        <Text>{jobsBD[0].country}</Text> */}
        {/* {jobs.length > 0 && (
          <FlatList
            style={styles.itemContainer}
            data={jobs}
            renderItem={({ item }) => <OffersCard item={item} />}
            keyExtractor={(item) => item.id}
          />
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
