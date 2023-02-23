/*
 * Componente para renderizar botones que ocupa el 90% del ancho del padre:
 * Props: type Primary   : Relleno por defecto azul y letras blancas
 *             Secondary : Sin relleno con el borde defecto azul y letras azul
 *             Link      : Sin relleno y sin bordes letras por defecto azul
 *        bgColor: opcional para el color del borde o del relleno
 *        txColor: opcional para el color del texto
 *        icon: opcional nombre del icon en FontAwesome @expo/vector-icon
 *        onPress: () => void
 */
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

type Props = {
  text: string;
  type?: 'Primary' | 'Secondary' | 'Link';
  bgColor?: string; //color
  txColor?: string;
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
  const bg =
    type === 'Primary'
      ? bgColor
        ? { backgroundColor: bgColor }
        : { backgroundColor: 'blue' }
      : type === 'Secondary'
      ? bgColor
        ? {
            backgroundColor: 'transparent',
            borderColor: bgColor,
          }
        : { backgroundColor: 'transparent', borderColor: 'blue' }
      : { backgroundColor: 'transparent' };

  const tx =
    type === 'Primary'
      ? txColor
        ? { color: txColor }
        : { color: 'white' }
      : txColor
      ? { color: txColor }
      : { color: 'blue' };
  const iconColor =
    type === 'Primary'
      ? txColor
        ? txColor
        : 'white'
      : txColor
      ? txColor
      : 'blue';

  return (
    <>
      <TouchableOpacity
        style={[styles.container, bg]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.button}>
          <Text style={[styles.text, tx]}>{text}</Text>
          {icon && <FontAwesome name={icon} size={24} color={iconColor} />}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textLink: { textAlign: 'center', color: 'blue' },
  textSecondary: { textAlign: 'center', color: 'blue' },
});
