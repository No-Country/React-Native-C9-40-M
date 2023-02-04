import { StyleSheet } from 'react-native';
import { CustomButton } from '../components/CustomButton';

type Props = {};
export const SocialLoging = (props: Props) => {
  const onRegisterWithGoogle = () => {
    console.warn('Haciendo Register con Google');
  };
  const onRegisterWithFaceBook = () => {
    console.warn('Haciendo Register con FaceBook');
  };

  const onRegisterWithApple = () => {
    console.warn('Haciendo Register con Apple');
  };

  return (
    <>
      <CustomButton
        onPress={onRegisterWithGoogle}
        text="Ingresar con Google"
        bgColor="#fae9ea"
        txColor="#dd4d44"
      />
      <CustomButton
        onPress={onRegisterWithFaceBook}
        text="Ingresar con Facebook"
        bgColor="#e7eaf4"
        txColor="#4765a9"
      />
      <CustomButton
        onPress={onRegisterWithApple}
        text="Ingresar con Apple"
        bgColor="#e3e3e3"
        txColor="#363636"
      />
    </>
  );
};
export default SocialLoging;
const styles = StyleSheet.create({});
