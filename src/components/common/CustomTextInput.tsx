import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
} from 'react-native';
import { Controller } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  control: any;
  placeholder: string;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
};

export const CustomTextInput = ({
  name,
  label,
  control,
  placeholder,
  maxLength,
  keyboardType = 'default',
  placeholderTextColor = '#3d3d3d',
  secureTextEntry = false,
  multiline = false,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.field}>
        <View style={error ? styles.containerError : styles.container}>
        <Text style={styles.title}>{label}</Text>
          <TextInput
            style={error ? styles.textInputError : styles.textInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength ? maxLength : 100}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
          />
        </View>
        {error && (
            <Text style={styles.error}>{error.message || 'Error'}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  field: {
    marginVertical: 5,
    marginHorizontal: "8%",
    marginTop: "5%"
  },
  container: {
    width: "100%",
    height: 96,
    borderBottomWidth: 1,
    borderBottomColor: "#363740",
  },
  containerError: {
    width: "100%",
    height: 96,
    borderBottomWidth: 1,
    borderBottomColor: "#AB0E0E",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: '5%',
   
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },

  textInputError: {
    flex: 1,
    fontSize: 14,
    backgroundColor: "#FFEBEB"
  },
  inputMultiline: {
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
  },
  error: { color: 'red', alignSelf: 'stretch', marginTop: 2 },
});
