import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import { COLORS, ROUTES } from "../constants";
import {
  ForgotPasswordScreen,
  HomeRecuiter,
  HomeScreen,
  JobPost,
  JobSeekerList,
  JobsScreen,
  LandingScreen,
  LoginScreen,
  ProfileAdd,
  RegisterScreen,
  RegisterSuccess,
} from "../screens";
import { LandingSidebar } from "./customMenus/LandingSidebar";

import logo from "../../assets/images/logo.png";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <LandingSidebar {...props} />}
      screenOptions={
        ({ activeTintColor: COLORS.logoBlue },
        {
          headerRight: () => (
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.image} />
            </View>
          ),
        })
      }
      // initialRouteName={ROUTES.LANDING_DRAWER}
      initialRouteName={ROUTES.HOME_RECRUITER_DRAWER}
      // initialRouteName={ROUTES.HOME_DRAWER}
    >
      <Drawer.Screen
        name={ROUTES.LANDING_DRAWER}
        component={LandingScreen}
        options={{
          title: ROUTES.LANDING,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.REGISTER_SUCCESS_DRAWER}
        component={RegisterSuccess}
        options={{
          title: ROUTES.REGISTER_SUCCESS,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.HOME_RECRUITER_DRAWER}
        component={HomeRecuiter}
        options={{
          title: ROUTES.HOME_RECRUITER,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.LOGIN_DRAWER}
        component={LoginScreen}
        options={{
          title: ROUTES.LOGIN,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="enter-outline" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.REGISTER_DRAWER}
        component={RegisterScreen}
        options={{
          title: ROUTES.REGISTER,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="person-add" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.FORGOT_PASSWORD_DRAWER}
        component={ForgotPasswordScreen}
        options={{
          title: ROUTES.FORGOT_PASSWORD,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="lock-closed-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={HomeScreen}
        options={{
          title: ROUTES.HOME,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="thumbs-up-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.JOBS_DRAWER}
        component={JobsScreen}
        options={{
          title: ROUTES.JOBS,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="thumbs-up-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.PROFILE_DRAWER}
        component={ProfileAdd}
        options={{
          title: ROUTES.PROFILE,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.JOBSPOST_DRAWER}
        component={JobPost}
        options={{
          title: ROUTES.JOBSPOST,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.JOBSEEKERLIST_DRAWER}
        component={JobSeekerList}
        options={{
          title: ROUTES.JOBSEEKERLIST,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="" size={18} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 40,
    resizeMode: "cover",
  },
});
