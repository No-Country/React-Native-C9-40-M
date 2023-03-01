import { useContext } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import { Footer } from "./Footer";
import { CARD } from "../../../constants/constants";
import { Skills } from "./Skills";
import { formatDate } from "../../../utils/formatDate";
import { UserContext } from "../../../GlobalStates/userContext";
import { useJobAplication } from "../../../hooks/useJobApplication";

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

export const OffersDetail = ({ job, setShowModal, showModal }: JobProps) => {
  const {
    id,
    image,
    title,
    company_id,
    description,
    company,
    work_place,
    working_day,
    country,
    salaries,
    post_date,
    jobs_tecnologies,
  } = job;

  const { currentUser } = useContext(UserContext);

  const ApplicationJob = async (id) => {
    const applicationData = { job_id: id, token: currentUser.token };
    console.log(applicationData);
    const result = await useJobAplication(applicationData);
    console.log(result);
    console.warn("Postulación exitosa");
  };

  const handleChoice = (direction: number) => {
    direction === -1 ? alert("NOPE") : ApplicationJob(id);
    setShowModal(false);
  };

  return (
    <Modal animationType="slide" visible={showModal}>
      <ScrollView>
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
              <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.company}>
                  {company_id ? company.name : "Anonimo"}
                </Text>
              </View>
              <Pressable style={[styles.rowAbsolute]}>
                <Ionicons name="share-social-outline" size={18} color="black" />
                <Ionicons name="ios-bookmark-outline" size={18} color="black" />
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
                <Text>$ {salaries[0].price}</Text>
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
              <View style={[styles.row]}>
                <View style={styles.mr8}>
                  <Ionicons name="checkbox-outline" size={24} color="black" />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <Skills jobTecnologies={jobs_tecnologies} />
          </View>

          <View style={styles.container}>
            <Text style={styles.sb}>Descripción del empleo </Text>
            <Text style={styles.textLeft}>{description}</Text>
          </View>

          <Footer handleChoice={handleChoice} />
        </View>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    width: "100%",
    height: CARD.HEIGHT,
    alignItems: "center",
  },
  container: {
    width: 340,
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
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
  textLeft: { textAlign: "left" },
  sb: { fontWeight: "500" },
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
