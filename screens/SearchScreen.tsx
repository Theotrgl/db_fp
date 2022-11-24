import React from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";

const SearchScreen = ({ navigation }: RootTabScreenProps<"Search">) => {
  return (
    <React.Fragment>
      <View>
        <Text>Search Screen</Text>
      </View>
    </React.Fragment>
  );
};

export default SearchScreen;
