import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image } from "react-native";
import { RootTabScreenProps } from "../types";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
import { access_store } from "../redux/reducers/access_token";
import ContentLoader, { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import api from "../DatabaseConn";

const Item = (items : any) =>{
  const navigation = useNavigation();
  console.log(items.data);
  var cont = 0;
  var output = [];

  while (cont < items.items){

    const object : any = {
      id: items.data[cont].id,
      friend : items.data[cont].b.username
    }
    
    output.push(
      <TouchableHighlight underlayColor={'transparent'} key={object.id} onPress={() => navigation.navigate('LibGamePage', object)
    }>
        <View style={styles.button}>
          <Image source={require('../assets/images/simple.jpg')} style={styles.image} />
          <Text style={styles.text}>{object.friend !== undefined ? object.friend : "Undefined"}</Text>
        </View>
      </TouchableHighlight>
    );
    cont++;
  }
  return output;
};


const FriendListScreen = ({ navigation }: RootTabScreenProps<"Library">) => {

  const [response, setResponse] = React.useState('');
  const [showBox, setShowBox] = React.useState(true);
  const [isloading, setIsLoading] = React.useState(true);
  const [render, setRender] = React.useState(false);

  const token = access_store.getState();
  const fetchData = async () =>  {
  try{
    const options = {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer' + ' ' + token.access.access_token,
      },
    };
    const res = await fetch(api + '/users/friendlist', options);
    try{
      const responseData : any = await res.json();
      return responseData;
    } catch(err){
      console.log(err);
      const res = await fetch(api + '/users/friendlist', options);
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
  const specialStyles = EStyleSheet.create({
    libHeight: {
      height : 900,
    }
  });

  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Friends</Text>
          <TouchableHighlight style={styles.cartBox} underlayColor={'transparent'} onPress={() => navigation.navigate("CartPage")}>
            <Image source={require('../assets/images/cart.png')} style={styles.cart}/>
          </TouchableHighlight>
        </View>

        <ScrollView>
          <View style={specialStyles.libHeight}>
          { data.length === 0 ? <Text style={styles.friend}>You have no friends :(</Text> : (isloading ? (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={390} />) : <Item items={items} data={data}/>)}
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

  button: {
    backgroundColor: 'white',
    height: "6rem",
    margin: "1rem",
  },

  image: {
    left: "1rem",
    width: "5rem",
    height: "5rem",
  },

  text: {
    fontSize: "1.2rem",
    left: "7rem",
    bottom: "3.5rem",
  },

  friend:{
    top: "2rem",
    fontSize: "1.1rem",
    alignSelf: "center",
  },

  cart : {
    height: "2rem",
    width: "2rem",
  },

  cartBox : {
    position: 'absolute',
    top: "1.7rem",
    left: "22rem",
  }
});
export default FriendListScreen;
