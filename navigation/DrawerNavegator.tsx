import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, ROUTES } from '../constants';
import { Landing, Login, Register, ForgotPassword } from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName={ROUTES.LANDING_DRAWER}>
      <Drawer.Screen
        name={ROUTES.LANDING_DRAWER}
        component={Landing}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{
          title: 'Ingresar',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="enter-outline" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.REGISTER}
        component={Register}
        options={{
          title: 'Registrarse',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="person-add" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{
          title: 'Recuperar Password',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="ios-lock-closed" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.HOME}
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
