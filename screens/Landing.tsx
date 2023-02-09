import { View, StyleSheet, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import logo from '../assets/images/logo.png';
import { CustomButton } from '../components/CustomButton';

export function LandingScreen() {
  const navigation = useNavigation();

  const onPressLogin = (): void => {
    navigation.navigate('Login');
  };

  const onPressRegister = (): void => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
