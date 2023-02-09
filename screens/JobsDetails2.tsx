import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useRoute, useNavigation } from "@react-navigation/native";
  import { Ionicons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import miImagen from "../assets/images/home1.jpg";
  
  const JobDetails = ({}) => {
    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params.id;
    let texto = `Estamos en la búsqueda de programadores junior parasumarse a nuestros proyectos de desarrollo y soporte deaplicaciones de gestión empresarial.
  
    Es una oportunidad ideal paraaquellos que habiendo hecho cursos de programación quieran comenzara incursionar en la realización de proyectos en el mundo real deldesarrollo de aplicaciones de software. Sus tareas serán :
    • Desarrollar actividades de mantenimiento correctivo y evolutivo delos sistemas ya desarrollados.
    • Participar en el relevamiento ydesarrollo de nuevas funcionalidades.
    • Participar en el desarrollode nuevas aplicaciones
    • Colaborar en proyectos de integración denuestros productos de software con otras aplicaciones. Requisitosexluyentes :
    • Poseer conocimientos en JavaScript trabajando conAngular o ReactJS.
    • Poseer conocimientos en base de datosrelacionales SQL.
    • Tener capacidad de trabajo en equipo y altaorientación a la satisfacción del cliente.
    • Ser creativo yautodidacta. Zona de Trabajo : Retiro, CABA. Disponibilidad paratrabajar de lunes a viernes de 9 a 18hs. Es condición excluyenteque los candidatos detallen su remuneraciónpretendida`;
  
    const [expanded, setExpanded] = useState(false);
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
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={miImagen}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.informationContainer}>
            {work.map((job) => (
              <View style={{ maxWidth: 350 }}>
                <Text style={{ maxWidth: 300, fontSize: 20, fontWeight: "bold" }}>
                  {job.title}
                </Text>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      maxWidth: 300,
                      fontWeight: "bold",
                      position: "relative",
                      top: 8,
                    }}
                  >
                    Nombre de la empresa
                  </Text>
                  <View style={styles.separator} />
                </View>
                <ScrollView>
                {showAll ? (
                  <>
                    {texto.length > 359 ? (
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text>{texto.slice(0, 358).concat("...")}</Text>
                        <Text
                          onPress={() => setShowAll(false)}
                          style={{ marginTop: 10 }}
                          title="Ver mas"
                        >Ver Mas</Text>
                      </View>
                    ) : (
                      <Text>{texto}</Text>
                    )}
                  </>
                ) : (
                  <View>
                    <Text>{texto}</Text>
                  </View>
                )}
                </ScrollView>
                {/* <Text className="Descripcion">{texto.length > 359 ? texto.slice(0, 356).concat('...') + "Ver Mas" : texto.description}</Text> */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Postularse</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Próximo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.container}></View>
        </View>
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
      fontWeight: "bold",
    },
    menuIconContainer: {
      width: 40,
      height: 40,
      color: "red",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 15,
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
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
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: "45%",
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
      fontSize: 16,
    },
  });
  