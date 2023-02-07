import { Pressable, StyleSheet, Text, View } from 'react-native';
type Props = {};
const OffersCard = ({ item }: Props) => {
  return (
    <Pressable>
      <View style={styles.item}>
        <Text style={[styles.title, styles.highlight]}>{item.company}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.type}</Text>
        <Text style={styles.text}>{item.nivel}</Text>
      </View>
    </Pressable>
  );
};
export default OffersCard;
const styles = StyleSheet.create({
  item: {
    width: 250,
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  highlight: {
    fontSize: 20,
    fontWeight: '700',
    color: 'purple',
    textAlign: 'center',
  },
});
