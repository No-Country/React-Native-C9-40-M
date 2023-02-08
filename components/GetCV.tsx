import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { CustomInput } from './CustomInput';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../assets/images/logo.png';
import { CustomButton } from './CustomButton';

const schema = yup
  .object({
    linkedInUrl: yup
      .string()
      // .url('no cumple con el formato')
      .required('Requerido'),
    gitUrl: yup
      .string()
      // .url('no cumple con el formato')
      .required('Requerido'),
  })
  .required();

type FormValues = {
  linkedInUrl: string;
  gitUrl: string;
};

interface Document {
  uri: string;
  name: string;
  type: string;
}

const GetCV = () => {
  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const [fileLoadMsg, setFileLoadMsg] = useState('');
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      linkedInUrl: '',
      gitUrl: '',
    },
    resolver: yupResolver(schema),
  });

  // Funcion que sube el documento por ahora solo pdf
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });
    if (result.type === 'success') {
      setFile(result);
    }
  };

  // Funcion que manda el documanto al backend
  const uploadFile = async () => {
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      name: file.name,
      type: 'application/pdf',
    } as Document);

    const response = await fetch('http://your-server.com/upload', {
      method: 'POST',
      body: data,
    });

    console.log(await response.json());
  };

  const handleCV = async (data: FormValues) => {
    if (!file) {
      setFileLoadMsg('Debe de subir su CV');
      return;
    }
    //ir a la siguiente pantalla
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Completa tu curriculum</Text>
        <Text style={styles.subtitle}>
          Te invitamos a que completes tu cv para que puedas encontrar tu
          trabajo ideal.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.field}>
          <Text style={styles.label}>Adjunta tu CV</Text>
          <Button title="Seleccionar archivo" onPress={pickDocument} />
          {fileLoadMsg && (
            <Text style={styles.error}>{fileLoadMsg || 'Error'}</Text>
          )}
        </View>

        <CustomInput
          name="linkedInUrl"
          label="LinkedIn"
          control={control}
          placeholder="Pega aqui el URL de tu perfil"
        />
        <CustomInput
          name="gitUrl"
          label="GitHub / Behance"
          control={control}
          placeholder="Pega aqui el URL de tu perfil"
        />

        <CustomButton
          onPress={handleSubmit(handleCV)}
          text="Siguiente"
          type="Secondary"
          bgColor=""
          txColor="#f3f3f3"
          icon="sign-in"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: '700',
  },
  text: {
    textAlign: 'center',
  },
  link: {
    color: 'blue',
  },
  logo: {
    width: '100%',
    maxWidth: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginBottom: 50,
  },
  errorMsg: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  errorText: {
    color: 'white',
    padding: 5,
  },
  field: {
    marginVertical: 5,
    marginHorizontal: 30,
  },
  label: {
    color: '#3d3d3d',
    marginBottom: 5,
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  error: { color: 'red', alignSelf: 'stretch' },
});

export default GetCV;
