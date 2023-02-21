import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../constants';
import { DrawerNavigator } from './DrawerNavegator';

import {
  ConfirmEmailScreen,
  ForgotPasswordScreen,
  HomeScreen,
  JobsScreen,
  LandingScreen,
  LoginScreen,
  ProfileAdd,
  RegisterScreen,
  ResetPasswordScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LANDING}>
        <Stack.Screen
          name={ROUTES.LANDING}
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={ROUTES.LOGIN_DRAWER} component={DrawerNavigator} />
        <Stack.Screen
          name={ROUTES.FORGOT_PASSWORD_DRAWER}
          component={DrawerNavigator}
        />
        <Stack.Screen
          name={ROUTES.REGISTER_DRAWER}
          component={DrawerNavigator}
        />

        <Stack.Screen
          name={ROUTES.JOBS}
          component={JobsScreen}
          options={{ title: 'Encuentra tu trabajo ideal' }}
        />
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name={ROUTES.PROFILE} component={ProfileAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
