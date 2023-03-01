import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/pages/ProfileShow/Card";
import { Header } from "../../components/pages/ProfileShow/Header";
import { Skills } from "../../components/pages/ProfileShow/Skills";
import { SummaryProfile } from "../../components/pages/ProfileShow/SummaryProfile";
import { COLORS } from "../../constants";
type Props = {};
export const ProfileShow = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header />
      <Card />
      <Skills />
      <SummaryProfile />
    </View>
  );
};
export default ProfileShow;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
    paddingHorizontal: 20,
  },
});
