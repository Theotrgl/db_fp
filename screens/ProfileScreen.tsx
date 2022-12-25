import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, Button, Modal, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { RootTabScreenProps } from "../types";

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

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Image
          style={styles.avatar}
          source={require("../assets/images/simple.jpg")}
        />
        <Text style={styles.username}>User Name</Text>
        <Text style={styles.email}>user@email.com</Text>
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
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: 16,
  },
  avatar: {
    width: "8rem",
    height: "8rem",
    borderRadius: 64,
    marginBottom: 16,
  },
  username: {
    fontSize: "1.5rem",
    marginBottom: "0.6rem",
  },
  email: {
    fontSize: "1rem",
    marginBottom: "10rem",
  },

  button:{
    padding: "0.5rem",
    borderRadius: 5,
    margin: "0.1rem",

  },

  text:{
    color: 'black',
    fontSize: "1rem",
  }

});

export default ProfileScreen;
