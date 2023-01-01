import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TouchableOpacity, Alert, TouchableHighlight, ScrollView, RefreshControl} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { access_store } from "../redux/reducers/access_token";
import { UserStore } from "../redux/reducers/authenticator_reducer";
import { Button, TextInput } from "react-native-paper";
import ContentLoader, { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import { RootTabScreenProps } from "../types";
import { Camera, CameraType } from 'expo-camera';
import api from "../DatabaseConn";

const PaymentItem = (items : any) =>{
  const navigation = useNavigation();
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
      <TouchableHighlight underlayColor={'transparent'} key={object.id} onPress={() => console.log("Pressed")}>
        <View style={styles.box}>
          <Text style={styles.newText}>{items.data !== undefined ? items.data[cont].card_number : "Undefined"}</Text>
          <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].expiration_date : "Undefined"}</Text>
          <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].description : "Undefined"}</Text> 
        </View>
      </TouchableHighlight>
    );
    cont++;
  }

  return output;
};


const ProfileScreen = () => {
  const [user, setUser] = useState('');
  const [password, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [isTransactionsModalVisible, setIsTransactionsModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] = useState(false);
  const [isPaymentEditModalVisible, setIsPaymentEditModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => setIsEditModalVisible(true);
  const hideEditModal = () => setIsEditModalVisible(false);
  const showTransactionsModal = () => setIsTransactionsModalVisible(true);
  const hideTransactionsModal = () => setIsTransactionsModalVisible(false);
  const showSettingsModal = () => setIsSettingsModalVisible(true);
  const hideSettingsModal = () => setIsSettingsModalVisible(false);
  const showPaymentMethodModal = () => setIsPaymentMethodModalVisible(true);
  const hidePaymentMethodModal = () => setIsPaymentMethodModalVisible(false);
  const showPaymentEditModal = () => setIsPaymentEditModalVisible(true);
  const hidePaymentEditModal = () => setIsPaymentEditModalVisible(false);

  const token = access_store.getState();
  const navigation = useNavigation();
  const [response, setResponse] = useState('');
  const [payment, setPayment] = useState('');
  const [game, setGame] = useState('');
  const [transaction, setTransaction] = useState('');
  const [card, setCard] = useState('');
  const [expirations, setExpiration] = useState('');
  const [description, setDescription] = useState('');
  const [security, setSecurity] = useState('');
  const [showBox, setShowBox] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [isloadingPay, setIsLoadingPay] = useState(true);

  const sendData = async (userName: string, userPassword: string) =>  {
    try {
      const data = { name: userName, password: userPassword};
      const options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer' + ' ' + token.access.access_token,
        },
      };
      const res = await fetch(api + '/users/update', options);
      const responseData : any = await res.json();
      return responseData;
    }
    catch(err){
      alert("Connection Error");
      console.log("send error");
    }
  
};

  const fetchData = async () =>  {
    try{
      const options = {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer' + ' ' + token.access.access_token,
        },
      };
      const res = await fetch(api + '/users/me', options);
      try{
        const responseData : any = await res.json();
        return responseData;
      } catch(err){
        console.log("error");
        const res = await fetch(api + '/users/me', options);
        const responseData : any = await res.json();
        return responseData;
      }

      return 0;
    }
    catch(err){
      console.log("fetching error");
    }
  }

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
        console.log("pay error inline");
        const res = await fetch(api + '/users/paymentmethods', options);
        const responseData : any = await res.json();
        return responseData;
      }
    }
    catch(err){
      console.log("payment data error");
    }
  }

  const fetchTransactionData = async () =>  {
    try{
      const options = {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer' + ' ' + token.access.access_token,
        },
      };
      const res = await fetch(api + '/users/transactions', options);
      try{
        const responseData : any = await res.json();
        return responseData;
      } catch(err){
        console.log("inside transaction error");
        const res = await fetch(api + '/users/transactions', options);
        const responseData : any = await res.json();
        return responseData;
      }
    }
    catch(err){
      console.log("transaction error");
    }
  }

  const createPaymentData = async (card : string, exp : string, desc : string) =>  {
    try{
      const data = { card: card, exp: exp, desc: desc };
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer' + ' ' + token.access.access_token,
        },
      };
      const res = await fetch(api + '/users/addpaymentmethod', options);
      try{
        const responseData : any = await res.json();
        return responseData;
      } catch(err){
        console.log('first payment method error');
        const res = await fetch(api + '/users/addpaymentmethod', options);
        const responseData : any = await res.json();
        return responseData;
      }
    }
    catch(err){
      console.log('payment method error');
    }
  }

  const TransactionItem = (items : any) =>{
    const navigation = useNavigation();
    var cont = 0;
    var output = [];
  
    while (cont < items.items){
      const object : any = {
        id: items.data[cont].id,
        game_title: items.data[cont].game.title,
        game_id: items.data[cont].game_id,
        user_id: items.data[cont].userId, 
        createdat: items.data[cont].createdAt,
        payment_method: items.data[cont].payment_method_id
      }
      

      output.push(
        <TouchableHighlight underlayColor={'transparent'} key={object.id} onPress={() => console.log("Pressed")}>
          <View style={styles.box}>
            <Text style={styles.newText}>{items.data !== undefined ? (items.data[cont].id.length < 29 ? items.data[cont].id : items.data[cont].id.substr(0,30) + ".." ) : "Undefined"}</Text>
            <Text style={styles.subText}>{object.game_title !== undefined ? object.game_title : "Undefined"}</Text>
            <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].payment_method_id : "Undefined"}</Text>
            <Text style={styles.subText}>{items.data !== undefined ? items.data[cont].createdAt : "Undefined"}</Text> 
          </View>
        </TouchableHighlight>
      );
      cont++;
    }
  
    return output;
  };
  
  async function main(){
    const response : any = await fetchData();
    setResponse(response);
    if (response) {
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

      const transaction : any = await fetchTransactionData();
      if(transaction.length === 0){
        console.log('empty');
      }
      setTransaction(transaction);
      if (transaction) {
        setIsLoadingPay(false);
      }
   };
  
  useEffect(() => {
    console.log('useEffect');
    main();
  }
  , []);

  const items : number = response.length;
  const data : any = response;
  const paylength : number = payment.length;
  const specialStyles = EStyleSheet.create({
      libHeight: {
        height : 900,
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
      height : 900,
      } 
    });
     setRefreshing(false);
    }, []);
  


  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("CameraPage")
        }}>
        <Image
          style={styles.avatar}
          source={{uri : 'https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067'}}
        />
        </TouchableOpacity>
        <Text style={styles.username}>{isloading ? (<ContentLoader active={true}  pRows={1} title={false} pHeight={30} pWidth={160} paragraphStyles={styles.load}/>) : response.username}</Text>
        <Text style={styles.email}>{isloading ? (<ContentLoader active={true} pRows={1} title={false} pHeight={30} pWidth={270} paragraphStyles={styles.load}/>) : response.email}</Text>
        <TouchableOpacity
          onPress={showEditModal}
          style={styles.button}><Text style={styles.text}>Edit Profile</Text></TouchableOpacity>

        <TouchableOpacity
          onPress={showSettingsModal}
          style={styles.button}><Text style={styles.text}>Settings</Text></TouchableOpacity>

        <TouchableOpacity
          onPress={showPaymentMethodModal}
          style={styles.button}><Text style={styles.text}>Payment Method</Text>
          </TouchableOpacity>

        <TouchableOpacity
          onPress={showTransactionsModal}
          style={styles.button}><Text style={styles.text}>Transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "",
              "Are you sure you want to log out?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    setShowBox(false);
                    UserStore.dispatch({type: 'logout'});
                    access_store.dispatch({type: 'UPDATE_VALUE', payload: {access_token: ''}});
                  },
                },
                {
                  text: "No",
                },
              ]
            );
          }}
          style={styles.button}><Text style={styles.text}>Log out</Text>
          </TouchableOpacity>
      </View>
      
      <Modal
        visible={isEditModalVisible}
        onRequestClose={hideEditModal}
      >
        <View style={styles.header}>
          <TouchableHighlight style={styles.arrowBox} underlayColor={'transparent'} onPress={() => {
             setIsEditModalVisible(false);
          }
             }>
            <Image source={require('../assets/images/arrow-back.png')} style={styles.arrow}/>
          </TouchableHighlight>
        </View>
        <View>
          <Text style={styles.login}>Edit Profile</Text>
          <Text style={styles.kext}>New username</Text>
          <TextInput
           mode="outlined"
           placeholder=" username"
           style={styles.input}
           value={user} 
           onChangeText={text => setUser(text)}/>
  
          <Text style={styles.kext}>New password</Text>
          <TextInput
           mode="outlined"
           placeholder= ""
           style={styles.input} 
           value={password} 
           onChangeText={text => setPass(text)}
           secureTextEntry={true}/>

          <Button 
            onPress={ async () => {
                console.log("Button pressed");
                if(password && password.length >= 8 && user.length >= 1){
                  try {
                    const result : any = await sendData(user, password);
                    if(result === undefined){ 
                        alert("Connection Error");
                    }
                  }
                  catch(err){
                    console.log(err);
                    alert("Connection Error");
                  }

                  setUser("");
                  setPass("");
                  alert("Done");
            } }
          }
            uppercase={false}
            color={'white'}
            style={styles.butts}>
            Confirm</Button>
        </View>
      </Modal>

      <Modal
        visible={isTransactionsModalVisible}
        onRequestClose={hideTransactionsModal}
      >
        <View style={styles.header}>
          <TouchableHighlight style={styles.arrowBox} underlayColor={'transparent'} onPress={() => {
             setIsTransactionsModalVisible(false);
          }
             }>
            <Image source={require('../assets/images/arrow-back.png')} style={styles.arrow}/>
          </TouchableHighlight>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={specialStyles.libHeight}>
            { payment.length == 0 ? <Text style={styles.game}>You have not made any transactions</Text> : (isloading ? (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={390} />) : <TransactionItem items={transaction.length} data={transaction}/>)}
          </View>
        </ScrollView>
      </Modal>
      <Modal
        visible={isSettingsModalVisible}
        onRequestClose={hideSettingsModal}
      >
        <View style={styles.header}>
          <TouchableHighlight style={styles.arrowBox} underlayColor={'transparent'} onPress={() => {
             setIsSettingsModalVisible(false);
          }
             }>
            <Image source={require('../assets/images/arrow-back.png')} style={styles.arrow}/>
          </TouchableHighlight>
        </View>
      </Modal>

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

          <TouchableHighlight style={styles.plusBox} underlayColor={'transparent'} onPress={() => {
             setIsPaymentEditModalVisible(true);
          }
             }>
            <Image source={require('../assets/images/plusisn.png')} style={styles.plus}/>
          </TouchableHighlight>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={specialStyles.libHeight}>
            { payment.length == 0 ? <Text style={styles.game}>You have no payment methods</Text> : (isloading ? (<ContentLoader active={true}  pRows={5} title={false} pHeight={110} pWidth={390} />) : <PaymentItem items={payment.length} data={payment}/>)}
          </View>
        </ScrollView>
      </Modal>

      <Modal
        visible={isPaymentEditModalVisible}
        onRequestClose={hidePaymentEditModal}
      >
        <View style={styles.header}>
          <TouchableHighlight style={styles.arrowBox} underlayColor={'transparent'} onPress={() => {
             setIsPaymentEditModalVisible(false);
          }
             }>
            <Image source={require('../assets/images/arrow-back.png')} style={styles.arrow}/>
          </TouchableHighlight>
        </View>
        <View>
          <Text style={styles.payment}>Create Payment Method</Text>
          <Text style={styles.kext}>Card Number</Text>
          <TextInput
           mode="outlined"
           placeholder=" Your card number"
           style={styles.input}
           value={card} 
           onChangeText={text => setCard(text)}/>
  
          <Text style={styles.kext}>Expiration Date</Text>
          <TextInput
           mode="outlined"
           placeholder= "The date of expiration"
           style={styles.input} 
           value={expirations} 
           onChangeText={text => setExpiration(text)}/>

          <Text style={styles.kext}>Security Code</Text>
          <TextInput
           mode="outlined"
           placeholder= "The three numbers at the back"
           style={styles.input} 
           value={security} 
           onChangeText={text => setSecurity(text)}
           secureTextEntry={true}/>

          <Text style={styles.kext}>Description</Text>
          <TextInput
           mode="outlined"
           placeholder= ""
           style={styles.desc} 
           value={description} 
           onChangeText={text => setDescription(text)}/>

          <Button 
            onPress={ async () => {
                console.log("Button pressed");
                if(security && expirations.length >= 5 && card.length >= 16 && expirations.length < 6){
                  try {
                    const result : any = await createPaymentData(card, expirations, description);
                    if(result === undefined){ 
                        alert("Connection Error");
                    }
                  }
                  catch(err){
                    console.log(err);
                    alert("Connection Error");
                  }

                  setCard("");
                  setExpiration("");
                  setSecurity("");
                  setDescription("");
                  alert("Done");
            }

            else {
              alert("Missing/False Input");
            }
           }
          }
            uppercase={false}
            color={'white'}
            style={styles.butts}>
            Add</Button>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = EStyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  title: {
    top: "1.5rem",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: 16,
  },
  avatar: {
    top: "1rem",
    width: "8rem",
    height: "8rem",
    borderRadius: 64,
    marginBottom: 16,
  },
  username: {
    top: "1rem",
    fontSize: "1.5rem",
    alignSelf: "center",
    marginBottom: "0.6rem",
  },
  email: {
    top: "1rem",
    fontSize: "1rem",
    alignSelf: "center",
    marginBottom: "10rem",
  },

  button:{
    padding: "0.5rem",
    borderRadius: 5,
    margin: "0.1rem",

  },

  text:{
    bottom: "2rem",
    color: 'black',
    fontSize: "1rem",
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

  plus : {
    height: "2rem",
    width: "2rem",
  },

  plusBox : {
    position: 'absolute',
    top: "1.7rem",
    left: "22rem",
  },

  load: {
    alignSelf: "center",
    top: "1rem",
  },

  input: {
    width: "90%",
    alignSelf: "center",
},

  loginRedirect: {
      paddingTop: "3%",
      alignSelf: "center",
  },

  header : {
    backgroundColor: "white",
    height: "5rem",
    elevation: 5
  },

  butts: {
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: '#1689BA',
      width: "84%",
      height: "8%",
      top: "110%",
      borderRadius: 30,
      elevation: 5,
      shadowColor: 'black',
      shadowRadius: 20
    },

    login: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      alignSelf: "center",
      paddingTop: "5%"
  },

    kext: {
      paddingTop: "5%",
      paddingLeft: "5%",
  },

    desc: {
      width: "90%",
      alignSelf: "center",
      height: "10rem"
    },

    game:{
      top: "2rem",
      fontSize: "1.1rem",
      alignSelf: "center",
    },

    payment: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      alignSelf: "center",
      paddingTop: "5%"
    },

    newText: {
      fontSize: "1rem",
      left: "3rem",
      bottom: "5.5rem",
    },
  
    subText: {
      fontSize: "0.7rem",
      left: "3rem",
      bottom: "5.5rem",
    },

    buton: {
      backgroundColor: 'white',
      height: "6rem",
      margin: "1rem",
      top: "10rem",
    },

    box: {
      height: "6rem",
      top: "6rem",
    }

});

export default ProfileScreen;
