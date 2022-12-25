import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image } from "react-native";
import { RootTabScreenProps } from "../types";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";

const items = 6;

const Item = () =>{
  var cont = 0;
  var output = [];
  while (cont < items){
    output.push(
      <TouchableHighlight underlayColor={'transparent'} onPress={() => console.log("Hello world")}>
        <View style={styles.button}>
          <Image source={require('../assets/images/simple.jpg')} style={styles.image} />
          <Text style={styles.text}>Simple</Text>
          <Text style={styles.text}>Android</Text>
          <Text style={styles.text}>Action</Text>
        </View>
      </TouchableHighlight>
    );
    cont++;
  }
  return output;
};


const Libheight = (items * 8) + "rem";

const LibraryScreen = ({ navigation }: RootTabScreenProps<"Library">) => {
  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Library</Text>
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
    height: Libheight,
  },

  button: {
    backgroundColor: 'white',
    height: "6rem",
    margin: "1rem",
  },

  image: {
    left: "1rem",
    width: "9rem",
    height: "6rem",
  },

  text: {
    fontSize: "1rem",
    left: "11rem",
    bottom: "5.5rem",
  }
});
export default LibraryScreen;
