import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { foo, HorizontalPicker } from "10c-horizontal-picker";
const VALUES = [
  { item: { name: "Avaluevalue", age: 1 }, id: "1" },
  { item: { name: "Bvaluevalue", age: 2 }, id: "2" },
  { item: { name: "Cvaluevalue", age: 3 }, id: "3" },
  { item: { name: "Dvaluevalue", age: 4 }, id: "4" },
  { item: { name: "Evaluevalue", age: 5 }, id: "5" },
  { item: { name: "Fvaluevalue", age: 6 }, id: "6" },
  { item: { name: "Gvaluevalue", age: 7 }, id: "7" },
];
const renderItemAux = ({ item, isSelected }) => {
  const {
    id,
    item: { name, age },
  } = item;
  return (
    <View style={isSelected && styles.selectedItem}>
      <Text>{name}</Text>
      <Text>{age}</Text>
    </View>
  );
};
export default function App() {
  console.log("importowana funkcja", foo());
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <HorizontalPicker
        data={VALUES}
        renderItem={renderItemAux}
        onSelect={(items) => console.log(items)}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: "red",
  },
});
