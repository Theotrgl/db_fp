import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text, Dimensions, Image, TouchableHighlight, Modal, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { RootTabScreenProps } from "../types";
import { Searchbar, Chip, Button } from "react-native-paper";
import GameCards from "../components/GameCards";
import EStyleSheet from 'react-native-extended-stylesheet';
import SafeViewAndroid from "../components/SafeViewAndroid";
import { MaterialIcons } from '@expo/vector-icons';



const height = Dimensions.get('window').height; const width = Dimensions.get('window').width;

const LibGamePageScreen = ({ route } : any) => {
  const { id, title, images, description, developer, publisher, price, average_rating } = route.params;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchModalVisible, setIsSearchVisible] = React.useState(false);
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.arrowBox} underlayColor={'transparent'} onPress={() => navigation.goBack()}>
            <Image source={require('../assets/images/arrow-back.png')} style={styles.arrow}/>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cartBox} underlayColor={'transparent'} onPress={() => navigation.navigate("CartPage")}>
            <Image source={require('../assets/images/cart.png')} style={styles.cart}/>
          </TouchableHighlight>
        </View>
        <View style={[styles.container,{}]} onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
          }}>
          <Text style={styles.features}>{title}</Text>
          <GameCards image={images} />
          <Text style={styles.des}>Description</Text>
          <Text style={styles.details}>{description.length > 360 ? description.substr(0,350) + "..." : description}</Text> 
        </View>
      </ScrollView>

      <View style={styles.get}>
      <Button 
            uppercase={false}
            color={'white'}
            style={styles.button}>
            Download</Button>
      </View>
      </SafeAreaView>

      <Modal
        visible={isSearchModalVisible}
        onRequestClose={() => setIsSearchVisible(false)}
      >
      </Modal>
    </React.Fragment>
  );
};

const styles = EStyleSheet.create({ 
  header: {
    elevation: 10,
    backgroundColor: 'white',
    height: "5rem",
  },

  container:{
    height: "50rem",
  },

  features: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: "2rem",
    borderRadius: "0.5rem",
    fontWeight: 'bold',
    fontSize: "1.5rem",
    color: 'black',
  },

  des: {
    top: "3rem",
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    left: "2rem",
    borderRadius: "0.5rem",
    fontWeight: 'bold',
    fontSize: "1rem",
    color: 'black',

  },

  details: {
    top: "3rem",
    left: "2rem",
    width: "85%",
  },

  more: {
    fontSize: "0.9rem",
    fontweight: 'bold',
    top: "5rem",
    left: "2rem",
    width: "85%",
  },

  rating: {
    fontSize: "0.9rem",
    fontweight: 'bold',
    top: "5rem",
    left: "2rem",
    width: "85%",
  },

  reviews: {
    fontSize: "1.2rem",
    fontweight: 'bold',
    top: "8rem",
    left: "2rem",
    width: "85%",
  },

  float: {
    flex: 0.2,
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
 },

  review:{
    top: "9rem",
    left: "2rem",
    width: "85%",
    height: "10rem",
    backgroundColor: 'white',
    borderRadius: "0.5rem",
    elevation: 5,
  },

  button: {
    alignSelf: 'center',
    backgroundColor: '#1689BA',
    width: "84%",
    height: "2.7rem",
    top: "1rem",
    borderRadius: 30,
    shadowColor: 'black',
    shadowRadius: 20
  },

  cart : {
    height: "2rem",
    width: "2rem",
  },

  cartBox : {
    position: 'absolute',
    top: "1.7rem",
    left: "22rem",
  },

  arrow : {
    height: "2rem",
    width: "2rem",
  },

  arrowBox : {
    position: 'absolute',
    top: "1.7rem",
    left: "2rem",
  },

  get: {
    backgroundColor: "white",
    height: "5rem",
    elevation: 10
  }
},
)



export default LibGamePageScreen;
