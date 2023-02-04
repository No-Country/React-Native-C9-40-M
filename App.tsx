// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { UserContextProvider } from './GlobalStates/userContext';
import { Navigation } from './navigation';

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
  },
});
