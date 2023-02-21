import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export const MenuButtonItem = ({ text, onPress, icon, color }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress} style={styles.optionContainer}>
        <View style={styles.icon}>
          <FontAwesome name={icon} size={18} color={color} />
        </View>
        <Text style={styles.menuItem}> {text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  menuItem: {
    margin: 5,
    fontSize: 18,
  },
});
