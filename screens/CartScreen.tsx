import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image, Alert, RefreshControl, Modal } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { RootTabScreenProps } from "../types";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
import { access_store } from "../redux/reducers/access_token";
import ContentLoader, { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import api from "../DatabaseConn";
import { CheckboxItem } from "react-native-paper/lib/typescript/components/Checkbox/CheckboxItem";

let ids : any= [];
const Item = (items : any) =>{
  const navigation = useNavigation();
  var cont = 0;
  var output = [];

  const token = access_store.getState();
  const sendData = async (id : number) => {
    let response : any = null;
    const data = { game: id};
    const result = async (data : any) => {
      try{
        const options = {
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer' + ' ' + token.access.access_token,
          },

        };
        const res = await fetch(api + '/users/removecart', options);
        try{
          const responseData = await res.json();
          response = responseData;
        } catch(err){
          const res = await fetch(api + '/users/removecart', options);
          const responseData = await res.json();
          response = responseData;
        }
  
      }
      catch(err){
        console.log(err);
      }
  
      if(response.length === 0){
        console.log('empty');
      }
    }
  
    return await result(data);
  };

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
      <TouchableHighlight underlayColor={'transparent'} key={object.id} onPress={() => {
        Alert.alert(
          "",
          "Are you sure you want to remove this game from your cart ?",
          [
            {
              text: "Yes",
              onPress: () => {
                sendData(object.id);;
              },
            },
            {
              text: "No",
            },
          ]
        );
        }}>
        <View style={styles.button}>
          <Image source={{ uri: object.images[1]}} style={styles.image} />
          <Text style={styles.text}>{items.data !== undefined ? items.data[cont].title : "Undefined"}</Text>
          <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].publisher : "Undefined"}</Text>
          <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].developer : "Undefined"}</Text>
        </View>
      </TouchableHighlight>
    );
    cont++;
    ids.push(object.id);
  }

  return output;
};

const CartPageScreen = ({ navigation }: RootTabScreenProps<"Library">) => {

  const [response, setResponse] = React.useState('');
  const [showBox, setShowBox] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [isloading, setIsLoading] = React.useState(true);
  const [isloadingPay, setIsLoadingPay] = useState(true);
  const [payid, setPayid] = useState('');
  const [payment, setPayment] = useState('');
  const [render, setRender] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] = useState(false);

  const showPaymentMethodModal = () => setIsPaymentMethodModalVisible(true);
  const hidePaymentMethodModal = () => setIsPaymentMethodModalVisible(false);

  const token = access_store.getState();

  const PaymentItem = (items : any) =>{
    var cont = 0;
    var output = [];
  
    const object : any = {
      id: items.data[cont].id,
      card: items.data[cont].card_number,
      description: items.data[cont].description,
      expirations: items.data[cont].expiration_date,
      user: items.data[cont].userId
    }
  
    while (cont < items.items){
      output.push(
          <View style={styles.box}>
            <View>
            <Text style={styles.newText}>{items.data !== undefined ? items.data[cont].card_number : "Undefined"}</Text>
            <Text style={styles.nubText}>{items.data !== undefined ? items.data[cont].expiration_date : "Undefined"}</Text>
            <Text style={styles.nubText}>{items.data !== undefined ? items.data[cont].description : "Undefined"}</Text> 
            </View>
            <View style={styles.check}>
            <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => {
              setPayid(object.id);
              setChecked(!checked);
              }} />
            </View>
          </View>
      );
      cont++;
    }
  
    return output;
  };

  const fetchPaymentData = async () =>  {
    try{
      const options = {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer' + ' ' + token.access.access_token,
        },
      };
      const res = await fetch(api + '/users/paymentmethods', options);
      try{
        const responseData : any = await res.json();
        return responseData;
      } catch(err){
        console.log(err);
        const res = await fetch(api + '/users/paymentmethods', options);
        const responseData : any = await res.json();
        return responseData;
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const fetchData = async () =>  {
  let responseData : any = null;
  let output = [];
  try{
    const options = {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer' + ' ' + token.access.access_token,
      },
    };
    const res = await fetch(api + '/users/cart', options);
    try{
      responseData = await res.json();
    } catch(err){
      const res = await fetch(api + '/users/cart', options);
      responseData = await res.json();
    }
  }

  catch(err){
    console.log(err);
  }

  let result = await responseData;

  let cont = 0;
  if(result != null){
    while(cont < result.length){
      const data : any = { game : result[cont].game_id};

      try{  
        const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer' + ' ' + token.access.access_token,
        },
      };
      
      const res = await fetch(api + '/game/getgame', options);
        try{
          const outresult = await res.json();
          output.push(await outresult);
          setIndex(cont + 1);
          cont++;
        } 
        catch(err){
          continue;
        }
      }

      catch(err){
        console.log(err);
      }

    }
      return output;
  }
}

  async function main(){
    const response : any = await fetchData();
    if(response.length === 0){
      console.log('empty');
    }
    setResponse(response);
    if (response && response !== undefined){
      setIsLoading(false);
    }

    const payment : any = await fetchPaymentData();
    if(payment.length === 0){
      console.log('empty');
    }
    setPayment(payment);
    if (payment) {
      setIsLoadingPay(false);
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
      height : (index * 7.8) + "rem",
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
       height : (response.length * 7.8) + "rem",
    } 
    });
    setRefreshing(false);
  }, []);

  const sendData = async (id : number) => {
    let response : any = null;
    const data = { game: id };
    const result = async (data : any) => {
      try{
        const options = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer' + ' ' + token.access.access_token,
          },

        };
        const res = await fetch(api + '/users/addgame', options);
        try{
          const responseData = await res.json();
          response = responseData;
        } catch(err){
          const res = await fetch(api + '/users/addgame', options);
          const responseData = await res.json();
          response = responseData;
        }
  
      }
      catch(err){
        console.log(err);
      }
  
      if(response.length === 0){
        console.log('empty');
      }
  
      return response;
    }
  
    return await result(data);
  };

  const sendTransactionData = async (id : number, payid : string) => {
    let response : any = null;
    const data = { game: id, pay_id: payid };
    const result = async (data : any) => {
      try{
        const options = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer' + ' ' + token.access.access_token,
          },

        };
        const res = await fetch(api + '/users/addtransaction', options);
        try{
          const responseData = await res.json();
          response = responseData;
        } catch(err){
          const res = await fetch(api + '/users/addtransaction', options);
          const responseData = await res.json();
          response = responseData;
        }
  
      }
      catch(err){
        console.log(err);
      }
  
      if(response.length === 0){
        console.log('empty');
      }
  
      return response;
    }
  
    return await result(data);
  };

  const sendCounterData = async (id : number) => {
    let response : any = null;
    const data = { game: id };
    const result = async (data : any) => {
      try{
        const options = {
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer' + ' ' + token.access.access_token,
          },

        };
        const res = await fetch(api + '/users/removecart', options);
        try{
          const responseData = await res.json();
          response = responseData;
        } catch(err){
          const res = await fetch(api + '/users/removecart', options);
          const responseData = await res.json();
          response = responseData;
        }
  
      }
      catch(err){
        console.log(err);
      }
  
      if(response.length === 0){
        console.log('empty');
      }
  
      return response;
    }
  
    return await result(data);
  };

  
  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.arrowBox} underlayColor={'transparent'} onPress={() => navigation.goBack()}>
            <Image source={require('../assets/images/arrow-back.png')} style={styles.arrow}/>
          </TouchableHighlight>

          <TouchableHighlight style={styles.plusBox} underlayColor={'transparent'} onPress={() => {
             setIsPaymentMethodModalVisible(true);
          }
             }>
            <Image source={require('../assets/images/plusisn.png')} style={styles.plus}/>
          </TouchableHighlight>
          <Text style={styles.headerText}>Cart</Text>
        </View>

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={specialStyles.libHeight}>
            { isloading ? (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={390} />) : (data.length === 0 ? <Text style={styles.game}>You have nothing in your cart</Text> : <Item items={items} data={data} index={index}/>)}
          </View>
        </ScrollView>

        <View style={styles.purchase}>
        <Button 
            uppercase={false}
            color={'white'}
            style={styles.butts}
            onPress= {() => {
              if(checked){
                for(let i = 0; i < data.length; i++) {
                  sendData(data[i].id);
                  sendTransactionData(data[i].id, payid);
                  sendCounterData(data[i].id);
                 }

                 alert("Success!");
               }
            else{
              alert("Please select a payment method");
            }
             }
            }
            >
            Purchase</Button>
        </View>
      </SafeAreaView>

      <Modal
        visible={isPaymentMethodModalVisible}
        onRequestClose={hidePaymentMethodModal}
      >
        <View style={styles.header}>
          <TouchableHighlight style={styles.arrowBox} underlayColor={'transparent'} onPress={() => {
             setIsPaymentMethodModalVisible(false);
          }
             }>
            <Image source={require('../assets/images/arrow-back.png')} style={styles.arrow}/>
          </TouchableHighlight>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={{height: 900}}>
            { payment.length == 0 ? <Text style={styles.game}>You have no payment methods</Text> : (isloading ? (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={390} />) : <PaymentItem items={payment.length} data={payment}/>)}
          </View>
        </ScrollView>
      </Modal>

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
    paddingTop: "1.3rem",
    paddingLeft: "1rem",
    fontfamily: "comic Sans",
    alignSelf: "center"
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

  subText : {
    fontSize: "0.7rem",
    left: "11rem",
    bottom: "5.5rem",
  },

  purchase: {
    backgroundColor: "white",
    height: "5rem",
    elevation: 10
  },

  game:{
    top: "2rem",
    fontSize: "1.1rem",
    alignSelf: "center",
  },

  cart : {
    position: 'absolute',
    height: "2rem",
    width: "2rem",
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

  butts: {
    alignSelf: 'center',
    backgroundColor: '#1689BA',
    width: "84%",
    height: "2.7rem",
    top: "1rem",
    borderRadius: 30,
    shadowColor: 'black',
    shadowRadius: 20
  },

  plus : {
    height: "2rem",
    width: "2rem",
  },

  plusBox : {
    position: 'absolute',
    top: "1.7rem",
    left: "22rem",
  },

  newText: {
    fontSize: "1rem",
    left: "3rem",
    bottom: "5.5rem",
  },

  nubText: {
    fontSize: "0.7rem",
    left: "3rem",
    bottom: "5.5rem",
  },

  box: {
    height: "6rem",
    top: "6rem",
  },

  check: {
    left: "22rem",
    bottom: "8.5rem",
  }


});
export default CartPageScreen;
