import React from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";

const FriendListScreen = ({ navigation }: RootTabScreenProps<"FriendList">) => {
  return (
    <React.Fragment>
      <View>
        <Text>FriendList Screen</Text>
      </View>
    </React.Fragment>
  );
};

export default FriendListScreen;
