import React from "react";
import { ScrollView, View, Text, Dimensions, Image } from "react-native";
import { RootTabScreenProps } from "../types";
import { Searchbar, Chip, Button } from "react-native-paper";
import CarouselCards from "../components/CarouselCards";
import SpecialCards from "../components/SpecialCards";
import EStyleSheet from 'react-native-extended-stylesheet';

const height = Dimensions.get('window').height; const width = Dimensions.get('window').width;

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <React.Fragment>
      <View style={styles.topView}>
      <Image source={require('../assets/images/minilogo.png')} style={styles.logo}/>
      <Searchbar
            style={styles.searchbar}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}

          />
      </View>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.container}>
          <Text style={styles.features}>Featured & Recommended</Text>
          <CarouselCards />

          <Text style={[styles.features, styles.extra]}>Specials</Text>
          <SpecialCards />

        </View>
        <View style={styles.container2}>
          <Text style={styles.features}>Browse</Text>
            <Button 
            style={[styles.button, {left: "5%"}]}
            color={'black'}
            uppercase={false}>Action</Button>
            <Button 
            style={styles.button}
            color={'black'}
            uppercase={false}>RPG</Button>
            <Button 
            style={[styles.button, {left: "5%", top: "55%"}]}
            color={'black'}
            uppercase={false}>Moba</Button>
            <Button 
            style={[styles.button, {left: "37%", top: "55%"}]}
            color={'black'}
            uppercase={false}>Kids</Button>
            <Button 
            style={[styles.button, {left: "68%"}]}
            color={'black'}
            uppercase={false}>Tactical</Button>
            <Button 
            style={[styles.button, {left: "68%", top: "55%"}]}
            color={'black'}
            uppercase={false}>Horror</Button>
        </View>
        <View style={styles.container3}>
          <Text style={styles.features}>Popular Titles</Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = EStyleSheet.create({ 
  container:{
    height: "40rem"
  },

  container2: {
    height: "15rem"
  },

  container3: {
    height: "30rem"
  },

  topView: {
    height: "5rem",
    backgroundColor: 'white',
    elevation: 10
  },

  logo:{
    position: 'absolute',
    height: "3rem",
    width: "2rem",
    top: "1.05rem",
    left: "1.2rem",
    
  },
  
  searchbar: {
    top: "1rem",
    width: "16rem",
    alignSelf: "center",
  },

  features: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: "2rem",
    borderRadius: "0.5rem",
    fontWeight: 'bold',
    fontSize: "1rem",
    color: 'black',
  },

  extra: {
    top: "13.5rem"
  },

  button: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    width: "28%",
    height: "20%",
    top: "30%",
    borderRadius: 30,
    elevation: 2,
  }

})



export default HomeScreen;
