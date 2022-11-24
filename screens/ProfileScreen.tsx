import React from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Profile">) => {
  return (
    <React.Fragment>
      <View>
        <Text>Profile Screen</Text>
      </View>
    </React.Fragment>
  );
};

export default ProfileScreen;
