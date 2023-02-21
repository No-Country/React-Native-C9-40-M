import { useContext, useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { Entypo } from '@expo/vector-icons';

import { UserContext } from '../GlobalStates/userContext';
import { useTechRol } from '../hooks/useTechRol';
import logo from '../../assets/images/logo.png';

type Direction = {
  direction: 'next' | 'prev';
};

type Props = {
  step: number;
  handleGoTo: (direction: Direction) => void;
};

export const ThirdScreen = ({ step, handleGoTo }: Props) => {
  /* Teclado activo o no */
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShown(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  /* Aqui almacenaremos las tecnologias dependiendo el rol que se seleccionara*/
  const [stackTecno, setstackTecno] = useState([]);

  //Convertimos a un objeto para la busqueda
  const tech = stackTecno.map((item) => ({ value: item }));

  const { selectedRol, selectedStack, setSelectedStack } =
    useContext(UserContext);

  //Funciones de navegacion con sus condicionales
  const handleBack = () => {
    handleGoTo('prev');
  };

  const handleNext = () => {
    if (stackTecno.length >= 1) {
      handleGoTo('next');
    }
  };

  /*Obtenemos las tecnologias del rol que seleccionamos en la pantalla anteror */
  useEffect(() => {
    const getTecno = async () => {
      const response = await useTechRol();
      const rols = response.filter((res) => res.name === selectedRol);
      const stack = rols.map((rol) => rol.rol_tecnology);
      const techNames = stack[0].map((tech) => tech.tecnology.name);
      setstackTecno(techNames);
    };
    getTecno();
    setSelectedStack([]);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>

        <View>
          <Text style={styles.titleText}>¿Qué tecnologias manejas?</Text>
          <Text style={styles.descriptionText}>
            Puedes elegir todas las opciones que quieras.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>
              Tecnologias asociadas al {selectedRol}
            </Text>

            <MultipleSelectList
              setSelected={(val) => setSelectedStack(val)}
              data={tech}
              save="value"
              dropdownStyles={styles.dropdown}
              boxStyles={styles.dropdown}
              checkBoxStyles={styles.checkbox}
              dropdownTextStyles={styles.textCheckbox}
              badgeStyles={{ backgroundColor: '#27358F' }}
              labelStyles={styles.stackText}
              label="Tu Stack:"
              placeholder="Selecciona tu stack de tecnologías"
              searchPlaceholder="Busca tus tecnologías"
              maxHeight={205}
              notFoundText="No se encontro ningun rol"
            />
          </View>
        </View>
      </ScrollView>
      {keyboardShown && (
        <KeyboardAvoidingView
          style={{ display: 'none' }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={1000} // ajusta este valor para hacer que el elemento desaparezca
        ></KeyboardAvoidingView>
      )}
      {!keyboardShown && (
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleBack()}>
              <View style={styles.buttonStyles}>
                <Entypo name="arrow-left" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNext()}>
              <View style={styles.buttonStyles}>
                <Entypo name="arrow-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  menu: {
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
    fontWeight: '500',
    color: '#0E1545',
    width: '70%',
    top: 21,
    left: 18,
    fontSize: 24,
    letterSpacing: -0.011,
    marginBottom: 5,
  },
  inputContainer: {
    zIndex: 100,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  inputText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontStyle: 'normal',
    top: 24,
    left: 20,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 10,
    width: '80%',
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

  textCheckbox: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
  },

  dropdown: {
    backgroundColor: '#E3E5FA',
    borderRadius: 16,
    borderColor: 0,
    transition: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  dropdownError: {
    backgroundColor: '#AA1E1E',
    borderRadius: 16,
    borderColor: 'none',
    transition: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  checkbox: {
    height: 22,
    width: 22,
    borderColor: '#363740',
    borderWidth: 2,
    color: '#fff',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  buttonStyles: {
    width: 70,
    height: 56,
    backgroundColor: '#0E1545',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
