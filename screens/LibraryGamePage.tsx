import React from "react";
import { ScrollView, View, Text, Dimensions, Image, TouchableHighlight, Modal, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { RootTabScreenProps } from "../types";
import { Searchbar, Chip, Button } from "react-native-paper";
import GameCards from "../components/GameCards";
import EStyleSheet from 'react-native-extended-stylesheet';
import SafeViewAndroid from "../components/SafeViewAndroid";
import { MaterialIcons } from '@expo/vector-icons';


const height = Dimensions.get('window').height; const width = Dimensions.get('window').width;

export const LibGamePageScreen = ({ route } : any) => {
  const { id, title, images, description, developer, publisher, price, average_rating } = route.params;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchModalVisible, setIsSearchVisible] = React.useState(false);

  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.header}>
        </View>
        <View style={styles.container}>
          <Text style={styles.features}>{title}</Text>
          <GameCards />
          <Text style={styles.des}>Description</Text>
          <Text style={styles.details}>{description}</Text> 
          <Text style={styles.more}>Developer : {developer}</Text>
          <Text style={styles.more}>Publisher : {publisher}</Text>
          <Text style={styles.more}>Genre :</Text>
          <Text style={styles.more}>Price : {price}</Text>
          <Text style={styles.rating}>Rating : {average_rating}</Text>
          <Text style={styles.reviews}>Reviews</Text>
          <TouchableOpacity style={styles.review}>
            <View>
              <Text style={styles.reviewText}>This game is awesome!</Text>
              <Text style={styles.reviewText}>- John Doe</Text>

            </View>
          </TouchableOpacity>

          <Button 
            uppercase={false}
            color={'white'}
            style={styles.button}>
            Download</Button>
        </View>
      </ScrollView>
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
    height: "67rem"
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
    top: "15rem",
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
    top: "15rem",
    left: "2rem",
    width: "85%",
  },

  more: {
    fontSize: "0.9rem",
    fontweight: 'bold',
    top: "17rem",
    left: "2rem",
    width: "85%",
  },

  rating: {
    fontSize: "0.9rem",
    fontweight: 'bold',
    top: "18rem",
    left: "2rem",
    width: "85%",
  },

  reviews: {
    fontSize: "1.2rem",
    fontweight: 'bold',
    top: "20rem",
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
    top: "21rem",
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
    height: "4%",
    top: "35%",
    borderRadius: 30,
    shadowColor: 'black',
    shadowRadius: 20
  },
},
)



export default LibGamePageScreen;
