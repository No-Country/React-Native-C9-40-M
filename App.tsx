import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserContextProvider } from "./src/GlobalStates/userContext";
import { Navigation } from "./src/navigation";
import { COLORS } from "./src/constants";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
    </UserContextProvider>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
  },
});
