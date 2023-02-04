import { useContext } from 'react';
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import miImagen from '../assets/images/home1.jpg';
import { UserContext } from '../GlobalStates/userContext';

export function HomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={miImagen}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View>
          <Text> Bienvenido : {currentUser.firstname}</Text>
          <Text> Apellido: {currentUser.lastname}</Text>
          <Text> Correo: {currentUser.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.navigate('Landing');
            }}
            title="Cerrar Sesión"
            color="purple"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 256,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 50,
  },
});
