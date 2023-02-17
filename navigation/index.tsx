import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
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

type Props = {};

export const Navigation = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName={"Profile"}
      >
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ title: 'Welcome to FindYourDreamJob' }}
        />
        <Stack.Screen
          name="Jobs"
          component={JobsScreen}
          options={{ title: 'Encuentra tu trabajo ideal' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
