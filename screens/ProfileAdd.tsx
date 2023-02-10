import { StyleSheet, Text, View } from 'react-native';
import GetCV from '../components/GetCV';
import { RolTech } from '../components/RolTech';
type Props = {};
const ProfileAdd = (props: Props) => {
  return (
    <View>
      {/* <RolTech /> */}
      <GetCV />
    </View>
  );
};
export default ProfileAdd;
const styles = StyleSheet.create({});
