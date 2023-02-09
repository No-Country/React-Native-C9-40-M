import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  CheckBox

} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import miImagen from "../assets/images/home1.jpg";
import TabNavigator from "../navigation/TabNavigator";

const JobDetails = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
    { id: 5, checked: false },
    { id: 6, checked: false },
    { id: 7, checked: false },
  ]);


  const [jobs, setJobs] = useState([]);
  const [work, setWorks] = useState([]);
  const [showAll, setShowAll] = useState(true);

  async function getInfo() {
    await fetch("https:node-server-navy-rho.vercel.app/jobs/")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));

    const work = jobs.find((job) => {
      if (job.id === Number(id)) {
        setWorks([job]);
      }
    });
  }

  useEffect(() => {
    getInfo();
  }, []);

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Logo</Text>
        <TouchableOpacity style={styles.menuIconContainer}>
          <Ionicons name="ios-menu" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="¿Qué quieres buscar?"
            placeholderTextColor="#000"
          />
          <Ionicons
            name="ios-search"
            size={20}
            color="#000"
            style={styles.icon}
          />
        </View>

        <View style={styles.rolContainer}>
          <Text style={styles.TextSkills}>Rol a ejercer</Text>
          <View style={{display: 'flex', flexDirection: 'row', marginLeft: 20}}>
          <Ionicons name="share-social-sharp" size={24} color="black" />
          <Ionicons name="share-social-sharp" size={24} color="black" />
          </View>
        </View>

        <View style={styles.informationContainer}>
        {work.map((job) => (
          <View>
            <Text>Nombre de la empresa</Text>
            <Text>{job.title}</Text>
            <Text>Modalidad</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <ScrollView style={styles.descriptionContainer}>
          {work.map((job) => (
            <Text>{job.description}</Text>
          ))}
        </ScrollView>
        <View style={styles.separator} />
        <View style={styles.containerSkills}>
          <Text style={styles.TextSkills}>Habilidades para el puesto:</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Postularse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
     
  <TabNavigator />

    </View>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
  },

  headerContainer: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    width: 80,
    fontWeight: "bold",
  },
  menuIconContainer: {
    height: 80,
    color: "red",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    height: 70,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: "100%",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "black",
  },
  icon: {
    position: "relative",
    right: 20,
  },

  rolContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#D3D3D3",
    width: '80%',
    height: 70
  },

  informationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: 70
  },

  descriptionContainer: {
    marginTop: 20,
    maxWidth: "80%",
  },

  

  containerSkills: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: "#D3D3D3",
    width: '80%',
    height: 40
  },

  TextSkills: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 256,
    marginTop: 40,
  },
  informationContainer: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    width: "80%",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: "35%",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 14,
  },
});
