import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { COLORS } from '../constants';
import { CustomButton } from './CustomButton';
import { SelectList } from 'react-native-dropdown-select-list';
import { UserContext } from '../GlobalStates/userContext';
import logo from '../assets/images/logo.png';

type Direction = {
  direction: 'next' | 'prev';
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

const data = [
  { key: '1', value: 'Frontend' },
  { key: '2', value: 'Backend' },
  { key: '3', value: 'UX/UI' },
  { key: '4', value: 'Devops' },
  { key: '5', value: 'QA Tester' },
  { key: '6', value: 'QA Automation' },
  { key: '7', value: 'Product Owner' },
  { key: '8', value: 'Marketing Digital' },
];

const technology = [
  { key: 'Javascript', type: 'Frontend', value: 'Javascript' },
  { type: 'Frontend', value: 'HTML' },
  { type: 'Frontend', value: 'React' },
  { type: 'Frontend', value: 'Typescript' },
  { type: 'Frontend', value: 'React-Native' },
  { type: 'Frontend', value: 'Angular' },
  { type: 'Frontend', value: 'Vue' },
  { type: 'Frontend', value: 'Svelte' },
  { type: 'Backend', value: 'Node' },
  { type: 'Backend', value: 'PHP' },
  { type: 'Backend', value: 'Java' },
  { type: 'Backend', value: 'C#' },
  { type: 'Backend', value: 'Kotlin' },
  { type: 'Backend', value: 'Python' },
  { type: 'Backend', value: 'MongoDb' },
  { type: 'Backend', value: 'MySQL' },
  { type: 'UX/UI', value: 'Adobe Photoshop' },
  { type: 'UX/UI', value: 'Adobe XD' },
  { type: 'UX/UI', value: 'Metodologias' },
  { type: 'UX/UI', value: 'UX Writing' },
  { type: 'UX/UI', value: 'Sketch' },
  { type: 'UX/UI', value: 'Balsamiq' },
];

export const SecondScreen = ({ step, handleGoTo }: Props) => {
  const { selectedRol, setselectedRol } = useContext(UserContext);
  const [error, setError] = useState(false);

  const handleBack = () => {
    handleGoTo('prev');
    console.log('regresar');
  };
  const handleNext = () => {
    if (selectedRol) {
      handleGoTo('next');
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    setselectedRol(null);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <View style={{ width: 50 }}>
            <CustomButton
              onPress={handleBack}
              text=""
              icon="arrow-circle-left"
              bgColor={COLORS.logoBlue}
            />
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Image source={logo} style={{ width: 150, height: 80 }} />
        </View>
      </View>
      <View style={styles.secondView}>
        <Text style={styles.titleText}>¿A qué te dedicas?</Text>
        <Text style={styles.descriptionText}>
          Cuéntanos cual es el rol que mas te identifica y que herramientas
          utilizas.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            {selectedRol
              ? `Tu rol principal es ${selectedRol}`
              : 'Tu rol principal'}
          </Text>
          <SelectList
            setSelected={(val) => setselectedRol(val)}
            data={data}
            save="value"
            dropdownStyles={{ backgroundColor: '#EBEBEB', zIndex: 100 }}
            dropdownItemStyles={{ marginHorizontal: 5, fontWeight: 'bold' }}
            placeholder="Selecciona una opción"
            searchPlaceholder="Busca tu rol en el mundo IT"
            maxHeight={130}
            notFoundText="No se encontro ningun rol"
          />
          {error ? (
            <Text style={styles.textError}>¡Debes seleccionar una Rol!</Text>
          ) : (
            ''
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Confirmar"
          bgColor={COLORS.logoBlue}
          onPress={() => handleNext()}
        />
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
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  secondView: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    background: '#D9D9D9',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    width: 80,
    fontWeight: 'bold',
  },
  logo: {},
  logoText: {
    fontSize: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    width: 301,
    height: 36,
    top: 21,
    left: 16,
    fontSize: 24,
    marginBottom: 10,
    letterSpacing: -0.011,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  input: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#F7F6F5',
    borderRadius: 8,
    shadowOffset: { width: 10, height: 10 },
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 4,
  },
  inputText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontStyle: 'normal',
    width: 320,
    height: 52,
    top: 24,
    left: 20,
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 20,
  },
  square: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#4D4A4A',
    borderRadius: 8,
    width: 140,
    height: 60,
  },
  category: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 20,
    margin: 15,
  },

  stackContainer: {
    position: 'absolute',
    minHeight: 600,
    left: 20,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  stackItemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  textError: {
    marginLeft: 20,
    position: 'absolute',
    top: 100,
    COLOR: '#0E1545',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    top: 600,
    alignSelf: 'center',
  },
});
