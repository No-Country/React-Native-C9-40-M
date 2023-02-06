import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
type Props = {};

export const CustomButton = ({
  onPress,
  text,
  type = 'Primary',
  bgColor,
  txColor,
}: Props) => {
  return (
    <Pressable
      style={[
        styles.container,
        styles[`container${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          styles[`text${type}`],
          bgColor ? { color: txColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
  },
  containerPrimary: {
    backgroundColor: 'blue',
  },
  containerSecondary: {
    borderColor: 'blue',
    borderWidth: 3,
  },
  containerLink: { color: 'blue', fontSize: 12 },
  text: { textAlign: 'center', color: 'white' },
  textLink: { textAlign: 'center', color: 'blue' },
  textSecondary: { textAlign: 'center', color: 'blue' },
});
