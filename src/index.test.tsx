import React from "react";

import HorizontalPicker from "./index";
import { View, Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

describe("HorizontalPicker", () => {
  let VALUES = [
    { item: { name: "Avaluevalue", age: 1 }, id: "1" },
    { item: { name: "Bvaluevalue", age: 2 }, id: "2" },
    { item: { name: "Cvaluevalue", age: 3 }, id: "3" },
    { item: { name: "Dvaluevalue", age: 4 }, id: "4" },
    { item: { name: "Evaluevalue", age: 5 }, id: "5" },
    { item: { name: "Fvaluevalue", age: 6 }, id: "6" },
    { item: { name: "Gvaluevalue", age: 7 }, id: "7" },
  ];

  const renderItemAux = ({
    item,
  }: {
    item: { id: string; item: { name: string; age: number } };
    isSelected: boolean;
  }) => {
    const {
      item: { name, age },
    } = item;
    return (
      <View>
        <Text>{name}</Text>
        <Text>{age}</Text>
      </View>
    );
  };

  it("should render picker", () => {
    const { getByTestId } = render(
      <HorizontalPicker
        data={VALUES}
        onSelect={(item) => {
          console.log(item);
        }}
        renderItem={renderItemAux}
      />
    );

    const list = getByTestId("pickerList");

    expect(list).toBeDefined();
  });

  it("should throw an error when renderItem is not passed in props", () => {
    try {
      render(
        <HorizontalPicker
          data={VALUES}
          onSelect={(item) => {
            console.log(item);
          }}
        />
      );
    } catch (error) {
      const jsError = error as Error;
      expect(jsError.message).toBe("renderItem method not passed!");
    }
  });

  it("should throw an error when renderItem is not passed in props2", () => {
    const fun = () =>
      render(
        <HorizontalPicker
          data={VALUES}
          onSelect={(item) => {
            console.log(item);
          }}
        />
      );
    expect(fun).toThrowError("renderItem method not passed!");
  });

  it("should not throw an error when all props are passed", () => {
    const fun = () =>
      render(
        <HorizontalPicker
          data={VALUES}
          onSelect={(item) => {
            console.log(item);
          }}
          renderItem={renderItemAux}
        />
      );
    expect(fun).not.toThrow();
  });

  it("should render empty list when data is null", () => {
    const { getByTestId } = render(
      <HorizontalPicker
        data={null}
        onSelect={(item) => {
          console.log(item);
        }}
        renderItem={renderItemAux}
      />
    );

    const list = getByTestId("pickerList");
    expect(list).toBeDefined();
  });

  it("should render list items properly", () => {
    const { getByText } = render(
      <HorizontalPicker
        data={VALUES}
        onSelect={(item) => {
          console.log(item);
        }}
        renderItem={renderItemAux}
      />
    );
    VALUES.every((x) => expect(getByText(x.item.name)).not.toBeNull());
  });

  it("should render x elements if x values are passed", () => {
    const { getAllByText } = render(
      <HorizontalPicker
        data={VALUES}
        onSelect={(item) => {
          console.log(item);
        }}
        renderItem={renderItemAux}
      />
    );
    const allTexts = getAllByText("valuevalue", { exact: false });
    expect(allTexts.length).toBe(VALUES.length);
  });

  it("should render items in given order", () => {
    const { getAllByText } = render(
      <HorizontalPicker
        data={VALUES}
        onSelect={(item) => {
          console.log(item);
        }}
        renderItem={renderItemAux}
      />
    );
    const allTexts = getAllByText("valuevalue", { exact: false });
    const textsStringified = JSON.stringify(
      allTexts.map((x) => x.props.children)
    );
    const valueTextsStringified = JSON.stringify(
      VALUES.map((v) => v.item.name)
    );
    expect(textsStringified).toBe(valueTextsStringified);
  });
  it("should call onSelect with selected item", () => {
    const onSelect = jest.fn();

    const { getByText } = render(
      <HorizontalPicker
        data={VALUES}
        onSelect={onSelect}
        renderItem={renderItemAux}
      />
    );

    const item = getByText("Avaluevalue");
    fireEvent.press(item);

    expect(onSelect).toBeCalledWith(VALUES[0]);
    expect(onSelect).not.toBeCalledWith(VALUES[1]);
    expect(onSelect).toBeCalledTimes(1);
  });
});
