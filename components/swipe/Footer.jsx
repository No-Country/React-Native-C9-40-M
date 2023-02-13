import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RoundButton } from './RoundButton';
import { COLORS } from '../../constants/constants';

export const Footer = ({ handleChoice }) => {
  return (
    <View style={styles.container}>
      <RoundButton
        name="thumbs-o-down"
        size={30}
        color={COLORS.nope}
        onPress={() => handleChoice(-1)}
      />
      <RoundButton
        name="heart-o"
        size={30}
        color={COLORS.like}
        onPress={() => handleChoice(0)}
      />
      <RoundButton
        name="thumbs-o-up"
        size={30}
        color={COLORS.like}
        onPress={() => handleChoice(1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    width: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
});
