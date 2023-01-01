import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image, RefreshControl } from "react-native";
import { RootTabScreenProps } from "../types";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
import { access_store } from "../redux/reducers/access_token";
import ContentLoader, { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import api from "../DatabaseConn";

const LibraryScreen = ({ navigation }: RootTabScreenProps<"Library">) => {

  const [response, setResponse] = React.useState('');
  const [showBox, setShowBox] = React.useState(true);
  const [isloading, setIsLoading] = React.useState(true);
  const [render, setRender] = React.useState(false);
  const [first, setFirst] = React.useState(true);

  const Item = (items : any) =>{
    const navigation = useNavigation();
    var cont = 0;
    var output = [];
  
    if(first){
      while (cont < items.items){

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

        output.push(
          <TouchableHighlight underlayColor={'transparent'} key={object.id} onPress={() => navigation.navigate('LibGamePage', object)
        }>
            <View style={styles.button}>
              <Image source={{ uri : items.data[cont].images["1"]}} style={styles.image} />
              <Text style={styles.text}>{items.data !== undefined ? items.data[cont].title : "Undefined"}</Text>
              <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].publisher : "Undefined"}</Text>
              <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].developer : "Undefined"}</Text>
            </View>
          </TouchableHighlight>
        );
        cont++;
      }
    return output;
    }
  };

  const token = access_store.getState();
  const fetchData = async () =>  {
  try{
    const options = {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer' + ' ' + token.access.access_token,
      },
    };
    const res = await fetch(api + '/users/games', options);
    try{
      const responseData : any = await res.json();
      return responseData;
    } catch(err){
      console.log(err);
      const res = await fetch(api + '/users/games', options);
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
      height : (response.length * 7.7) + "rem",
    }
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    main();
    const items : number = response.length;
    const data : any = response;
    const specialStyles = EStyleSheet.create({
      libHeight: {
       height : (response.length * 7.7) + "rem",
    } 
    });
    setRefreshing(false);
  }, []);

  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Library</Text>
        <TouchableHighlight style={styles.cartBox} underlayColor={'transparent'} onPress={() => navigation.navigate("CartPage")}>
           <Image source={require('../assets/images/cart.png')} style={styles.cart}/>
        </TouchableHighlight>
        </View>

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={specialStyles.libHeight}>
            { data.length === 0 ? <Text style={styles.game}>You have no games</Text> : (isloading ? (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={390} />) : (first ? <Item items={items} data={data}/> : (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={390} />)) )}
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
    width: "9rem",
    height: "6rem",
  },

  text: {
    fontSize: "1rem",
    left: "11rem",
    bottom: "5.5rem",
  },

  subText: {
    fontSize: "0.7rem",
    left: "11rem",
    bottom: "5.5rem",
  },

  game:{
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
export default LibraryScreen;
