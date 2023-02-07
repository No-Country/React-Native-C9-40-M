import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import miImagen from '../assets/images/home2.jpg';
import { CustomButton } from '../components/CustomButton';
import { JobsOfert } from '../assets/data/fakeData';
import OffersCard from '../components/OffersCard';

type ItemProps = {
  item: {
    id: string;
    title: string;
    type: string;
    nivel: string;
  };
};

export function LandingScreen() {
  const navigation = useNavigation();

  const onPressLogin = (): void => {
    navigation.navigate('Login');
  };

  const onPressRegister = (): void => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={miImagen}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />

        <FlatList
          style={styles.itemContainer}
          data={JobsOfert}
          renderItem={({ item }) => <OffersCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          initialNumToRender={0}
        />

        {/* <Pressable onPress={onPressLogin} style={styles.pressableContainer}>
          <Text style={styles.textButton}>Iniciar Sesión</Text>
          <Entypo name="login" size={24} color="white" />
        </Pressable> */}

        <CustomButton
          onPress={onPressLogin}
          text="Inicial Sesión"
          type="Primary"
          bgColor=""
          txColor="#f3f3f3"
          icon="sign-in"
        />
        <CustomButton
          onPress={onPressRegister}
          text="Registrarse"
          type="Secondary"
          bgColor=""
          txColor="blue"
          icon="user-plus"
        />
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
  contentContainer: {
    paddingVertical: 20,
    backgroundColor: 'purple',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
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
  textButton: {
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  pressableContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ad40af',
    marginBottom: 50,
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    marginBottom: 10,
  },
});
