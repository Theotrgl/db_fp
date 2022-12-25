import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image } from "react-native";
import { RootTabScreenProps } from "../types";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";

const items = 10;

const Item = () =>{
  var cont = 0;
  var output = [];
  while (cont < items){
    output.push(
      <TouchableHighlight underlayColor={'transparent'} onPress={() => console.log("Hello world")}>
        <View style={styles.button}>
          <Image source={require('../assets/images/simple.jpg')} style={styles.image} />
          <Text style={styles.text}>Simple</Text>
        </View>
      </TouchableHighlight>
    );
    cont++;
  }
  return output;
};


const Friendheight = (items * 6) + "rem";

const FriendListScreen = ({ navigation }: RootTabScreenProps<"FriendList">) => {
  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Friends</Text>
        </View>

        <ScrollView>
          <View style={styles.lib}>
           <Item/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = EStyleSheet.create({
  header: {
    height: "5rem",
    backgroundColor: 'white',
    elevation: 10
  },

  headerText: {
    fontSize: "1.5rem",
    fontweight: "bold",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    fontfamily: "comic Sans",
  },

  lib: {
    height: Friendheight,
  },

  button: {
    backgroundColor: 'white',
    height: "4rem",
    margin: "1rem",
  },

  image: {
    bordercolor: 'purple',
    left: "1rem",
    width: "4rem",
    height: "4rem",
  },

  text: {
    fontSize: "1rem",
    left: "6rem",
    bottom: "3.5rem",
  }
});

export default FriendListScreen;
