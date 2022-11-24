import React from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";

const LibraryScreen = ({ navigation }: RootTabScreenProps<"Library">) => {
  return (
    <React.Fragment>
      <View>
        <Text>Library Screen</Text>
      </View>
    </React.Fragment>
  );
};

export default LibraryScreen;
