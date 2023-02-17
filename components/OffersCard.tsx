import { Pressable, StyleSheet, Text, View } from 'react-native';
type Props = {};
const OffersCard = ({
  title,
  company = 'Anonimo',
  description,
  work_place,
  working_day,
  country,
}: Props) => {
  return (
    <Pressable>
      <View style={[styles.item, styles.shadow]}>
        <Text style={styles.title}>{company}</Text>
        <Text style={[styles.title, styles.highlight]}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.text}>{work_place}</Text>
        <Text style={styles.text}>{working_day}</Text>

        <Text style={styles.text}>{country}</Text>
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
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  highlight: {
    fontSize: 20,
    fontWeight: '700',
    color: 'purple',
    textAlign: 'center',
  },
  shadow: {
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0,
    shadowRadius: 10,

    elevation: 10,
  },
});
