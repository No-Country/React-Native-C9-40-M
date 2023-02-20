import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { LoginScreen } from '../screens/auth/Login';
import { RegisterScreen } from '../screens/auth/Register';

export type TabStackParamList = {
  Customer: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#59c1cc',
        tabBarInactiveTintColor: 'red',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Login') {
            return <FontAwesome name="users" size={24} color="black" />;
          } else {
            return (
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={24}
                color="black"
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Orders" component={RegisterScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigator;
