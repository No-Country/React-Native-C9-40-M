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

export const CustomInput = ({
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
          <Text style={styles.label}>{label}</Text>
          <View
            style={[
              styles.inputContainer,
              { borderColor: error ? 'red' : '#e8e8e8' },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              maxLength={maxLength ? maxLength : 100}
              keyboardType={keyboardType}
              placeholderTextColor={placeholderTextColor}
              style={multiline ? styles.inputMultiline : styles.input}
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
    marginHorizontal: 30,
  },
  label: {
    color: '#3d3d3d',
    marginBottom: 5,
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  inputMultiline: {
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
  },
  error: { color: 'red', alignSelf: 'stretch' },
});
