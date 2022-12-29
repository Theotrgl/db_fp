import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image } from "react-native";
import { RootTabScreenProps } from "../types";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
import { access_store } from "../redux/reducers/access_token";
import ContentLoader, { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';


const Item = (items : any) =>{
  const navigation = useNavigation();
  console.log(items.data);
  var cont = 0;
  var output = [];
  const object : any = {
    id: items.data[cont].id,
    title: items.data[cont].title,
    description: items.data[cont].description,
    developer: items.data[cont].developer,
    publisher: items.data[cont].publisher,
    images: items.data[cont].images,
    price: items.data[cont].price,
    average_rating: items.data[cont].average_rating,
  }
  while (cont < items.items){
    output.push(
      <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('LibGamePage', object)
    }>
        <View style={styles.button}>
          <Image source={require('../assets/images/simple.jpg')} style={styles.image} />
          <Text style={styles.text}>{items.data !== undefined ? items.data[cont].title : "Undefined"}</Text>
          <Text style={styles.text}>{items.data !== undefined ? items.data[cont].publisher : "Undefined"}</Text>
          <Text style={styles.text}>{items.data !== undefined ? items.data[cont].developer : "Undefined"}</Text>
        </View>
      </TouchableHighlight>
    );
    cont++;
  }
  return output;
};


const Libheight = (6 * 8) + "rem";

const LibraryScreen = ({ navigation }: RootTabScreenProps<"Library">) => {

  const [response, setResponse] = React.useState('');
  const [showBox, setShowBox] = React.useState(true);
  const [isloading, setIsLoading] = React.useState(true);

  const token = access_store.getState();
  const fetchData = async () =>  {
  try{
    const options = {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer' + ' ' + token.access.access_token,
      },
    };
    const res = await fetch('https://d6bb-61-247-34-131.ngrok.io/users/games', options);
    try{
      const responseData : any = await res.json();
      return responseData;
    } catch(err){
      console.log(err);
      const res = await fetch('https://d6bb-61-247-34-131.ngrok.io/users/games', options);
      const responseData : any = await res.json();
      return responseData;
    }
  }
  catch(err){
    console.log(err);
  }
}

  async function main(){
    const response : any = await fetchData();
    console.log(await response);
    if(response.length === 0){
      console.log('empty');
    }
    setResponse(response);
    if (response) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    console.log('useEffect');
    main();
  }
  , []);

  const items : number = response.length;
  const data : any = response;

  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Library</Text>
        </View>

        <ScrollView>
          <View style={styles.lib}>
            {isloading ? (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={360} />) : <Item items={items} data={data}/>}
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
