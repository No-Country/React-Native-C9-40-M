import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, ForgotPasswordScreen, RegisterScreen } from '../screens';
import { COLORS, ROUTES } from '../constants';
import { DrawerNavigator } from './DrawerNavegator';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
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
      <Stack.Screen name={ROUTES.REGISTER_DRAWER} component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
