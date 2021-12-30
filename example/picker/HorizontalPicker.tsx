import React, { useState } from "react";
import { Pressable, FlatList } from "react-native";

export type Member = {
  name: string;
  age: number;
};

export interface Item<T> {
  id: string;
  item: T;
}

// npm library*
// - docs*
// - gif*
// - uniwersalnosc / opinionated*
// - mały rozmiar*
// - nowe techniki*
// - kompatybilność - babel, typescipt // build -> tsc*
// - linter*
// - testy*
// - example project for local development*
//

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
  //   initialItem?: Item;
  //   isMultiSelect?: boolean;
}

const HorizontalPicker = <T,>({ data, renderItem, onSelect }: Props<T>) => {
  const [selectedItems, setSelectedItems] = useState<Item<T>[]>([]);

  const onItemPress = (item: Item<T>) => {
    onSelect(item);
    // const isSelected = selectedItems.find(elem => elem.id )
    setSelectedItems([item]);
    // if (false) {
    //   const foundSelectedIndex = selectedItems.findIndex((selected) => {
    //     return selected.item === item.item;
    //   });
    //   let newSelected = [...selectedItems];
    //   if (foundSelectedIndex !== -1) {
    //     newSelected.splice(foundSelectedIndex, 1);
    //     setSelectedItems(newSelected);
    //   } else {
    //     newSelected.push(item);
    //     setSelectedItems(newSelected);
    //   }
    // } else {
    //   setSelectedItems([item]);
    // }
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
