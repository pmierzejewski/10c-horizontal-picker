import React, { useState } from "react";
import { Pressable, FlatList } from "react-native";

export const foo = (name: string): string => {
  return "bar";
};

export type Member = {
  name: string;
  age: number;
};

export interface Item<T> {
  id: string;
  item: T;
}

interface Props<T> {
  data: Array<Item<T>>;
  renderItem: ({
    item,
    isSelected,
  }: {
    item: Item<T>;
    isSelected: boolean;
  }) => JSX.Element;
  onSelect: (item: Item<T>) => void;
}

const HorizontalPicker = <T,>({ data, renderItem, onSelect }: Props<T>) => {
  const [selectedItems, setSelectedItems] = useState<Item<T>[]>([]);

  const onItemPress = (item: Item<T>) => {
    onSelect(item);
    setSelectedItems([item]);
  };

  const pressableRenderItem = ({ item }: { item: Item<T> }) => {
    const isSelected = selectedItems.includes(item);
    return (
      <Pressable onPress={() => onItemPress(item)}>
        {renderItem({ item, isSelected })}
      </Pressable>
    );
  };

  return (
    <FlatList
      keyExtractor={(item: Item<T>) => item.id}
      renderItem={pressableRenderItem}
      data={data}
      horizontal
    />
  );
};

export default HorizontalPicker;
