import { Image, StyleSheet, Text, View } from 'react-native';
// import { useRoute } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import { COLORS, ROUTES } from '../../constants';
import { MenuButtonItem } from './MenuButtonItem';
import logo from '../../../assets/images/logo.png';

export const LandingSidebar = ({ navigation, state }) => {
  const routeName = state.routeNames[state.index];

  let activeScreen: string;

  switch (routeName) {
    case ROUTES.LANDING_DRAWER:
    case ROUTES.LOGIN_DRAWER:
    case ROUTES.REGISTER_DRAWER:
    case ROUTES.FORGOT_PASSWORD_DRAWER:
      activeScreen = 'Menu inicial';
      break;
    case ROUTES.JOBS:
    case ROUTES.JOBS_DRAWER:
    case ROUTES.PROFILE_DRAWER:
    case ROUTES.HOME_DRAWER:
      activeScreen = 'Menu User';
      break;
  }

  console.log('estas en ', routeName, ' y Debe de mostrar ', activeScreen);

  return (
    <DrawerContentScrollView style={styles.menuContainer}>
      <>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
        </View>
        <Text style={styles.menuTitle}>{activeScreen}</Text>
        {activeScreen === 'Menu inicial' && (
          <>
            <MenuButtonItem
              text={ROUTES.LANDING}
              onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
              icon="home"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.LOGIN}
              onPress={() => navigation.navigate(ROUTES.LOGIN_DRAWER)}
              icon="sign-in"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.REGISTER}
              onPress={() => navigation.navigate(ROUTES.REGISTER_DRAWER)}
              icon="user-plus"
              color={COLORS.logoGold}
            />
          </>
        )}
        {activeScreen === 'Menu User' && (
          <>
            <MenuButtonItem
              text={ROUTES.HOME}
              onPress={() => navigation.navigate(ROUTES.HOME_DRAWER)}
              icon="home"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.PROFILE}
              onPress={() => navigation.navigate(ROUTES.PROFILE_DRAWER)}
              icon="gear"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={ROUTES.JOBS}
              onPress={() => navigation.navigate(ROUTES.JOBS_DRAWER)}
              icon="briefcase"
              color={COLORS.logoGold}
            />
            <MenuButtonItem
              text={'Cerrar Sesión'}
              onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
              icon="sign-out"
              color={COLORS.logoGold}
            />
          </>
        )}
      </>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#FFEBD7',
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  menuItem: {
    marginVertical: 5,
    fontSize: 18,
  },
});
