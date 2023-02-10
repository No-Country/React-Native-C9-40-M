import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from '../utils/validationSchema/getCV';

import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';

import logo from '../assets/images/logo.png';

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
      <View style={styles.header}>
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
            <View style={styles.errorMsg}>
              <Text style={styles.error}>{fileLoadMsg || 'Error'}</Text>
            </View>
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
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
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
  bold: {
    fontWeight: '700',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
  },
  logo: {
    width: '100%',
    maxWidth: 200,
    height: 150,
    resizeMode: 'contain',
  },
  errorMsg: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
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
