import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/dataProvider";

export function Jobs() {
  const [jobs, setJobs] = useState([]);

  function getInfo() {
    fetch("https://node-server-navy-rho.vercel.app/jobs/")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  }

  useEffect(() => {
    getInfo();
  }, []);

  const navigation = useNavigation();

  const Item = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("JobDetails", { id: item.id })}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        key={jobs.id}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        vertical={true}
        initialNumToRender={10}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
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

  // ...
});
