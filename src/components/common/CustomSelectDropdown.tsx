import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { UserContext } from "../../GlobalStates/userContext";

type Props = {};

export const SelectDropdown = ({
  data = [],
  onSelect = () => {},
  value = {},
}: Props) => {
  const [inData, setInData] = useState(data);
  const [showOption, setShowOption] = useState(false);

  const onSelectItem = (item) => {
    onSelect(item.name);
    setShowOption(!showOption);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyles}
        onPress={() => setShowOption(!showOption)}
        activeOpacity={0.7}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!value ? <AntDesign name="search1" size={18} /> : ""}
          <Text style={{ marginHorizontal: 5 }}>
            {!value ? "Seleccionar una opción" : value}
          </Text>
        </View>
        <FontAwesome
          name={showOption ? "chevron-up" : "chevron-down"}
          size={14}
          color="#0E1545"
        />
      </TouchableOpacity>
      {showOption && (
        <View style={styles.dropDownGroup}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            scrollIndicatorInsets={{ top: 10, bottom: 10, left: 10, right: 10 }}
            indicatorStyle="black"
          >
            {inData.map((rol) => {
              return (
                <TouchableOpacity
                  key={rol.id}
                  onPress={() => onSelectItem(rol)}
                  style={{
                    ...styles.dropDownItem,
                    backgroundColor: rol.name === value ? "red" : "",

                    marginBottom: 4,
                  }}
                >
                  <Text>{rol.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export const MultipleSelectDropdown = ({
  data = [],
  onSelect = () => {},
  values = [],
}: Props) => {
  const [inData, setInData] = useState(data);
  const [showOption, setShowOption] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [valuesSelected, setValuesSelected] = useState(values);
  const [showSelectedItems, setShowSelectedItems] = useState(values.length > 0);
  const [error, setError] = useState(false);

  const { selectedStack, setSelectedStack } = useContext(UserContext);

  const onSelectItems = (item) => {
    setIsChange(!isChange);
    const index = valuesSelected.findIndex((value) => value.id === item.id);

    if (index !== -1) {
      valuesSelected.splice(index, 1);
    } else {
      if (selectedStack.length < 4) {
        setError(false);
        valuesSelected.push(item);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    }

    setValuesSelected(valuesSelected);
  };

  console.log(valuesSelected.map((value) => value.name));

  const removeItem = (name: string) => {
    setValuesSelected(
      valuesSelected.filter((value: string) => value.name !== name)
    );
  };

  const onCloseSelection = () => {
    onSelect(valuesSelected);
    setShowOption(!showOption);
  };

  useEffect(() => {}, [isChange, removeItem]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyles}
        onPress={() => onCloseSelection()}
        activeOpacity={0.7}
      >
        {error ? (
          <Text style={{ marginLeft: 5, color: COLORS.danger }}>
            {"Solo puedes seleccionar hasta 4 opciones"}
          </Text>
        ) : (
          <Text style={{ marginLeft: 5 }}>{"Selecciona hasta 4 opciones"}</Text>
        )}
        <FontAwesome
          name={showOption ? "chevron-up" : "plus-square-o"}
          size={18}
          color={COLORS.label}
        />
      </TouchableOpacity>

      {showOption && (
        <View style={styles.dropDownGroupMulti}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            {inData &&
              inData.length > 0 &&
              inData.map((rol, i) => {
                return (
                  <TouchableOpacity
                    key={rol.id}
                    onPress={() => {
                      onSelectItems(rol);
                    }}
                    style={styles.dropDownItems}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginRight: 30,
                      }}
                    >
                      {valuesSelected.some((val) => val.id == rol.id) ? (
                        <Ionicons
                          name="checkbox"
                          size={22}
                          color={COLORS.label}
                          style={{ marginRight: 5 }}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="checkbox-blank-outline"
                          size={22}
                          color="black"
                          style={{ marginRight: 5 }}
                        />
                      )}

                      <Text>{rol.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}

      <View style={styles.selectedGroup}>
        <View style={styles.itemsContainer}>
          {valuesSelected.map((value: any) => {
            return (
              <View style={styles.chip} key={value.id}>
                <Text style={styles.chipText}>{value.name}</Text>

                <TouchableOpacity
                  onPress={() => {
                    removeItem(value.name);
                  }}
                >
                  <MaterialIcons name="cancel" size={22} color="white" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  // estilos para el input select
  dropDownStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 16,
    backgroundColor: COLORS.white,
    padding: 14,
    minHeight: 32,
    marginBottom: 2,
  },

  // estilos para los elementos a seleccionar
  dropDownGroup: {
    width: "100%",

    backgroundColor: COLORS.skyColor,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 15,
    marginVertical: 4,
    maxHeight: 164,
    zIndex: 100,
  },

  dropDownGroupMulti: {
    width: "100%",
    backgroundColor: "#E3E5FA",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 15,
    marginVertical: 4,
    maxHeight: 164,
    zIndex: 100,
  },

  // estilos para el elemento seleccionado
  dropDownItem: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 4,
  },
  // estilos para el elemento en la seleccion multiple
  dropDownItems: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 4,
    backgroundColor: "#E3E5FA",
  },

  // estilos para el grupo seleccionado
  selectedGroup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    position: "relative",
  },
  // estilos para el elementos seleccionados e y mostrado abajo
  selectedItems: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    borderRadius: 10,
  },

  itemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    height: "100%",
    marginTop: "5%",
  },
  chip: {
    width: "35%",
    height: 50,
    backgroundColor: "#27358F",
    borderWidth: 1,
    borderColor: "#B3B5C4",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    margin: 5,
  },
  chipText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
