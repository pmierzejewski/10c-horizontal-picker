import React from "react";

import HorizontalPicker, { foo } from "./index";
import { View, Text } from "react-native";
import { render } from "@testing-library/react-native";

describe("foo", () => {
  it("should return bar", () => {
    const expectedResult = "bar";

    const result = foo("elo");

    expect(result).toBe(expectedResult);
  });
});

describe("HorizontalPicker", () => {
  it("should render picker", () => {
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
        <View>
          <Text>{name}</Text>
          <Text>{age}</Text>
        </View>
      );
    };

    const { debug } = render(
      <HorizontalPicker
        testID={"elo"}
        data={VALUES}
        onSelect={(item) => {
          console.log(item);
        }}
        renderItem={renderItemAux}
      />
    );
    debug();
  });
});
