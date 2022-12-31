import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Modal, TouchableOpacity, Alert } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { access_store } from "../redux/reducers/access_token";
import { UserStore } from "../redux/reducers/authenticator_reducer";
import ContentLoader, { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import { RootTabScreenProps } from "../types";
import { Camera, CameraType } from 'expo-camera';
import api from "../DatabaseConn";

const TransactionsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Transactions</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Settings</Text>
  </View>
);

const PaymentMethodScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Payment Method</Text>
  </View>
);

const ProfileScreen = () => {
  const [isTransactionsModalVisible, setIsTransactionsModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] = useState(false);

  const showTransactionsModal = () => setIsTransactionsModalVisible(true);
  const hideTransactionsModal = () => setIsTransactionsModalVisible(false);
  const showSettingsModal = () => setIsSettingsModalVisible(true);
  const hideSettingsModal = () => setIsSettingsModalVisible(false);
  const showPaymentMethodModal = () => setIsPaymentMethodModalVisible(true);
  const hidePaymentMethodModal = () => setIsPaymentMethodModalVisible(false);

  const token = access_store.getState();

  const [response, setResponse] = useState('');
  const [showBox, setShowBox] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const navigation = useNavigation();

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
        console.log(err);
        const res = await fetch(api + '/users/me', options);
        const responseData : any = await res.json();
        return responseData;
      }

      return 0;
    }
    catch(err){
      console.log(err);
    }
  }
  
  async function main(){
    const response : any = await fetchData();
    setResponse(response);
    if (response) {
      setIsLoading(false);
    }
    console.log(response);
   };
  
  useEffect(() => {
    console.log('useEffect');
    main();
  }
  , []);


  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("CameraPage")
        }}>
        <Image
          style={styles.avatar}
          source={{uri : 'https://peternelsonsub.com/gallery_gen/6dc28991a95610dc0bd4f852c57d5d07.jpg'}}
        />
        </TouchableOpacity>
        <Text style={styles.username}>{isloading ? (<ContentLoader active={true}  pRows={1} title={false} pHeight={30} pWidth={160} paragraphStyles={styles.load}/>) : response.username}</Text>
        <Text style={styles.email}>{isloading ? (<ContentLoader active={true} pRows={1} title={false} pHeight={30} pWidth={270} paragraphStyles={styles.load}/>) : response.email}</Text>
        <TouchableOpacity
          onPress={showSettingsModal}
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
        visible={isTransactionsModalVisible}
        onRequestClose={hideTransactionsModal}
      >
        <TransactionsScreen />
      </Modal>
      <Modal
        visible={isSettingsModalVisible}
        onRequestClose={hideSettingsModal}
      >
        <SettingsScreen />
      </Modal>
      <Modal
        visible={isPaymentMethodModalVisible}
        onRequestClose={hidePaymentMethodModal}
      >
        <PaymentMethodScreen />
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

  load: {
    alignSelf: "center",
    top: "1rem",
  }

});

export default ProfileScreen;
