import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

type Props = {
  text: string;
  type: string;
  bgColor: string;
  txColor: string;
  icon?: string;
  onPress: () => void;
};

export const CustomButton = ({
  onPress,
  text,
  type = 'Primary',
  bgColor,
  txColor,
  icon,
}: Props) => {
  return (
    <>
      <Pressable
        style={[
          styles.container,
          styles[`container${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
        onPress={onPress}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
          {icon && <FontAwesome name={icon} size={24} color={txColor} />}
        </View>
      </Pressable>
    </>
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
  text: {
    textAlign: 'center',
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textLink: { textAlign: 'center', color: 'blue' },
  textSecondary: { textAlign: 'center', color: 'blue' },
  textButton: {
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
