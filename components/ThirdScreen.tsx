import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';
import { CustomButton } from './CustomButton';

type Direction = {
  direction: 'next' | 'prev';
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const ThirdScreen = ({ step, handleGoTo }: Props) => {
  const handleBack = () => {
    handleGoTo('prev');
  };
  const handleNext = () => {
    console.log('Validar datos antes de pasar  la siguiente pantalla');
    handleGoTo('next');
  };
  return (
    <View>
      <Text>Pantalla en el paso {step}</Text>
      <Text style={styles.title}>¿Qué tecnologías /herramientas manejas?</Text>
      <Text style={styles.title}>
        Esta Pantalla se capturan el rol principal del usuario
      </Text>
      <Text style={styles.title}>Desarrollandose por Santiago</Text>

      <View style={styles.row}>
        <View style={{ width: 50 }}>
          <CustomButton
            onPress={handleBack}
            text=""
            icon="arrow-circle-left"
            bgColor={COLORS.logoBlue}
          />
        </View>
        <View style={{ width: 50 }}>
          <CustomButton
            onPress={handleNext}
            text=""
            icon="arrow-circle-right"
            bgColor={COLORS.logoGold}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
});
