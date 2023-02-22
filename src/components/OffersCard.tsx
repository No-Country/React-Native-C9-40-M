import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CARD } from "../constants/constants";
type OffersCardProps = {
  title: string;
  company: string;
  description: string;
  work_place: string;
  working_day: string;
  country: string;
};
const OffersCard = ({
  title,
  company = "Anonimo",
  description,
  work_place,
  working_day,
  country,
}: OffersCardProps) => {
  return (
    <>
      <View style={{ width: 400 }}>
        {/* <Pressable>
          <View style={[styles.item, styles.shadow]}>
            <Text style={styles.title}>{company}</Text>
            <Text style={[styles.title, styles.highlight]}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
            <Text style={styles.text}>{work_place}</Text>
            <Text style={styles.text}>{working_day}</Text>

            <Text style={styles.text}>{country}</Text>
          <Text> Ver Detalle</Text>
          </View>
        </Pressable> */}
        <View style={styles.rol}>
          <Text style={styles.hightligh}>Rol a ejercer</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Nombre de la Empresa: </Text>
            {company}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Rol a ejercer: </Text>
            {title}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Modalidad: </Text>
            {working_day}
          </Text>
        </View>
        <View style={styles.rol}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Región: </Text>
            direccion.region
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>País: </Text>
            {country}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Ciudad: </Text>
            direccion.ciudad
          </Text>
        </View>
        <View style={styles.rol}>
          <Text style={styles.hightligh}>Descripción del puesto:</Text>
          <Text style={styles.long} numberOfLines={4}>
            {description}
          </Text>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
        />
      </View>
    </>
  );
};
export default OffersCard;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
    flex: 1,
    top: 45,
    backgroundColor: "#D7E6EA",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    borderRadius: CARD.BORDER_RADIUS,
  },
  choiceContainer: {
    position: "absolute",
    top: 100,
  },
  likeContainer: {
    left: 15,
    transform: [{ rotate: "-30deg" }],
  },
  nopeContainer: {
    right: 15,
    transform: [{ rotate: "30deg" }],
  },
  rol: {
    padding: 20,
    borderColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
  },
  hightligh: {
    paddingHorizontal: 10,
    fontSize: 22,
    backgroundColor: "lightgreen",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  long: {
    fontSize: 18,
    maxHeight: 85,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "700",
  },
  item: {
    width: 250,
    backgroundColor: "#e0e0e0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
  },
  highlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "purple",
    textAlign: "center",
  },
  shadow: {
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0,
    shadowRadius: 10,

    elevation: 10,
  },
});
