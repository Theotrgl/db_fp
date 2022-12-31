import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { RootTabScreenProps } from "../types";
import { TextInput, Button} from "react-native-paper";
import { AuthenticationPages } from "../navigation";
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigation from "../navigation";
import useColorScheme from '../hooks/useColorScheme';
import { UserStore } from "../redux/reducers/authenticator_reducer";
import { access_store, refresh_store } from "../redux/reducers/access_token";
import { loginAction } from "../redux/actions/authentiAction";
import api from "../DatabaseConn";

const SignUpScreen = ({navigation} : {navigation: any}) => {
  const [user, setUser] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const [confirm, setCon] = React.useState('');
  const colorScheme = useColorScheme();


  const fetchData = async (userEmail: string, userPassword: string, userName : string) =>  {
      const data = { email: userEmail, password: userPassword, username:  userName};
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await fetch(api + '/auth/signup', options);
      const responseData : any = await res.json();
      console.log(responseData);
      return responseData;
  };



  return (
    <React.Fragment>
      <View>
        <Text style={styles.register}>Register</Text>

        <Text style={styles.text}>Username</Text>
        <TextInput
         mode="outlined"
         placeholder="Username"
         style={styles.input}
         value={user} 
         onChangeText={text => setUser(text)}/>

        <Text style={styles.text}>Email</Text>
        <TextInput
         mode="outlined"
         placeholder="Email"
         style={styles.input}
         value={email} 
         onChangeText={text => setEmail(text)}/>

        <Text style={styles.text}>Password</Text>
        <TextInput
         mode="outlined"
         placeholder="Must be 8 characters or more"
         style={styles.input} 
         value={password} 
         onChangeText={text => setPass(text)}
         secureTextEntry={true}/>

        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
         mode="outlined"
         placeholder=""
         style={styles.input}
         value={confirm} 
         onChangeText={text => setCon(text)}
         secureTextEntry={true} />

        <Text style={styles.loginRedirect}>Already have an account ?
            <Text 
            onPress={() => navigation.navigate("Login")} 
            style={{color: 'blue'}}> Log in
            </Text>
        </Text>

        <Button 
          onPress={async () => { 
            if(password === confirm && password.length >= 8 && user.length >= 1){
              const response = await fetchData(email, password, user);
              if(response === null){
                alert("Denied");
              }
              else if(response.hasOwnProperty('access_token')){
                UserStore.dispatch({type: "signup"});
                refresh_store.dispatch({type: "UPDATE_VALUE", payload: response.refresh_token});
                access_store.dispatch({type: "UPDATE_VALUE", payload: response.access_token});
              }
              else{
                alert("Username/Email is taken");
              }
           }
           else{
                alert("Passwords don't match/is too short or Username/Email is empty/taken");
           }
         }}
          uppercase={false}
          color={'white'}
          style={styles.button}>
          Sign Up</Button>
          <Image source={require('../assets/images/primallogo.png')} style={styles.image} />
      </View>
    </React.Fragment>
  );
};

const styles = EStyleSheet.create({
    register: {
        fontSize: "1.3rem",
        fontWeight: "bold",
        alignSelf: "center",
        paddingRight: "65%",
        paddingTop: "20%"
    },

    text: {
        paddingTop: "5%",
        paddingLeft: "5%",
    },

    input: {
        width: "90%",
        alignSelf: "center",
    },

    loginRedirect: {
        paddingTop: "3%",
        alignSelf: "center",
    },

    button: {
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

      image: {
        position: 'absolute',
        height: "12rem",
        width: "10rem",
        alignSelf: "center",
        top: "42rem",
      }

})

export default SignUpScreen;
