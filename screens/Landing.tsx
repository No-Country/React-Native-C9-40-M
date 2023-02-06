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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Full Stack MERN',
    type: 'Hibrido',
    nivel: 'semi Senior',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Java',
    type: 'Presencial',
    nivel: 'Senior',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Java Programmer',
    type: 'Hibrido',
    nivel: 'Experto',
  },
];

type ItemProps = {
  item: {
    id: string;
    title: string;
    type: string;
    nivel: string;
  };
};

const Item = ({ item }: ItemProps) => (
  <Pressable onPress={() => console.warn('ver trabajo')}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.type}</Text>
      <Text style={styles.text}>{item.nivel}</Text>
    </View>
  </Pressable>
);

export function LandingScreen() {
  const navigation = useNavigation();

  const onPressLogin = (): void => {
    navigation.navigate('Login');
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
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          initialNumToRender={0}
        />

        <Pressable onPress={onPressLogin} style={styles.pressableContainer}>
          <Text style={styles.textButton}>Login</Text>
          <Entypo name="login" size={24} color="white" />
        </Pressable>
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
  item: {
    width: 250,
    backgroundColor: 'yellow',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
