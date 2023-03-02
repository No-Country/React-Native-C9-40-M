import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import { useState } from "react";
import { CARD } from "../../../constants/constants";
import { formatDate } from "../../../utils/formatDate";

type CompanyName = {
  name: string;
};

type JobProps = {
  job: {
    id: number;
    image: string;
    title: string;
    company_id: number;
    company: CompanyName;
    description: string;
    work_place: string;
    working_day: string;
    country: string;
    post_date: string;
  };
};

export const ApplicationCard = ({ job }: JobProps) => {
  const {
    id,
    image,
    title,
    company_id,
    company,
    work_place,
    working_day,
    country,
    salaries,
    post_date,
    jobs_tecnologies,
  } = job;

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.company}>
            {company_id ? company.name : "Anonimo"}
          </Text>
        </View>
        <Pressable style={[styles.rowAbsolute]}>
          {/* <Ionicons name="share-social-outline" size={18} color="black" /> */}
          <Ionicons name="bookmark" size={18} color="black" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <View style={styles.mr8}>
            <Fontisto name="world-o" size={24} color="black" />
          </View>
          <Text>
            {country} ({work_place})
          </Text>
        </View>
        <View style={[styles.row]}>
          <View style={styles.mr8}>
            <Ionicons name="cash-outline" size={24} color="black" />
          </View>
          {/* <Text>$ {salaries[0].price}</Text> */}
        </View>
        <View style={[styles.row]}>
          <View style={styles.mr8}>
            <Ionicons name="time-outline" size={24} color="black" />
          </View>
          <Text>{working_day}</Text>
        </View>
        <View style={[styles.row]}>
          <View style={styles.mr8}>
            <Ionicons name="calendar-outline" size={24} color="black" />
          </View>
          <Text>{formatDate(post_date)}</Text>
        </View>
      </View>
      <View style={[styles.row, styles.end]}>
        <Text style={styles.full}> {"Status"}</Text>
        <Ionicons name="trash-outline" size={20} color="black" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: CARD.WIDTH,
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    width: "100%",
  },
  company: {
    color: COLORS.primary,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  end: {
    justifyContent: "flex-end",
  },
  full: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  rowAbsolute: {
    flexDirection: "row",
    position: "absolute",
    right: 0,
    top: 0,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: "cover",
  },
  detailButton: {
    position: "absolute",
    right: 0,
    top: -50,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: COLORS.white,
  },
  body: { padding: 10, marginBottom: 10 },
  mr8: {
    marginRight: 8,
  },
  sb: {},
  textTecnology: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.onPress,
    color: COLORS.white,
    borderRadius: 5,
    marginRight: 10,
  },
});
