import React from "react";
import { 
  View,
   Text,
    Image,
     TouchableHighlight,
     StyleSheet
     } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button } from "react-native-paper";

const StartScreen = ({navigation} : {navigation : any}) => {
  return (
    <React.Fragment>
      <View>
        <Image source={require('../assets/images/simple.jpg')} style={styles.image}/>
        <Text style={styles.text}>Welcome to
          <Text style={{color: 'orange'}}> Primal Games
          </Text>
        </Text>
        <Button 
          onPress={() => navigation.navigate("SignUp")}
          uppercase={false}
          color={'white'}
          style={styles.button}>
          Let's Game</Button>
      </View>
    </React.Fragment>
  );
};

//note use rem and percentages for sizing, only use absolutes if necessary
//also possibly use alignself center for better positioning
const styles = EStyleSheet.create({
  image: {
    width: "190%",
    height: "82%",
    right: "70%",
  },

  text: {
    fontSize: "1.3rem",
    fontFamily: "sans-serif",
    alignSelf: "center",
    top: "3%"
  },
  
  button: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#1689BA',
    width: "84%",
    height: "7%",
    top: "97%",
    borderRadius: 30,
    elevation: 5,
    shadowColor: 'black',
    shadowRadius: 20
  }
});

export default StartScreen;
