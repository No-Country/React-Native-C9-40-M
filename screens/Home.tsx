import { useContext } from 'react';
import { Button, View, StyleSheet, Text, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../GlobalStates/userContext';
import { JobsOfert } from '../assets/data/fakeData';
import OffersCard from '../components/OffersCard';

export function HomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const userName =
    currentUser.firstname === null ? currentUser.email : currentUser.firstname;
  return (
    <>
      <View style={styles.container}>
        {/* <Image
          source={miImagen}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        /> */}
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
        <FlatList
          style={styles.itemContainer}
          data={JobsOfert}
          renderItem={({ item }) => <OffersCard item={item} />}
          keyExtractor={(item) => item.id}
        />
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
