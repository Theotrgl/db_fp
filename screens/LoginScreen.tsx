import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { RootTabScreenProps } from "../types";
import { TextInput, Button} from "react-native-paper";
import EStyleSheet from 'react-native-extended-stylesheet';
import { UserStore }from "../redux/reducers/authenticator_reducer";
import { access_store } from "../redux/reducers/access_token";

const LogInScreen = ({navigation} : {navigation: any}) => {
    const [user, setUser] = React.useState('');
    const [password, setPass] = React.useState('');

    const fetchData = async (userEmail: string, userPassword: string) =>  {
      try {
        const data = { user: userEmail, password: userPassword};
        const options = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const res = await fetch('https://d0fa-61-247-34-131.ngrok.io/auth/signin', options);
        const responseData : any = await res.json();
        return responseData;
      }
      catch(err){
        alert("Connection Error");
        console.log(err);
      }
    
  };
  
    return (
      <React.Fragment>
        <View>
          <Text style={styles.login}>Login</Text>
          <Text style={styles.text}>Username/Email</Text>
          <TextInput
           mode="outlined"
           placeholder="Username/Email"
           style={styles.input}
           value={user} 
           onChangeText={text => setUser(text)}/>
  
          <Text style={styles.text}>Password</Text>
          <TextInput
           mode="outlined"
           placeholder= ""
           style={styles.input} 
           value={password} 
           onChangeText={text => setPass(text)}
           secureTextEntry={true}/>
  
          <Text style={styles.loginRedirect}>Don't have an account ?
              <Text 
              onPress={() => navigation.navigate("SignUp")} 
              style={{color: 'blue'}}> Sign Up
              </Text>
          </Text>
  
          <Button 
            onPress={ async () => {
                console.log("Button pressed");
                if(password && password.length >= 8 && user.length >= 1){
                  try {
                    const response : any = await fetchData(user, password);
                    console.log(response);
                    if(response === undefined){ 
                        alert("Connection Error");
                    }
                    else if(response.hasOwnProperty('access_token')){
                      UserStore.dispatch({type: "login"});
                      access_store.dispatch({type: "UPDATE_VALUE", payload: response.access_token});
                  }
                    else{
                    alert("User does not exist or password is wrong");
                     }
                  }
                  catch(err){
                    console.log(err);
                    alert("Connection Error");
                  }
            } }
          }
            uppercase={false}
            color={'white'}
            style={styles.button}>
            Log in</Button>
            <Image source={require('../assets/images/primallogo.png')} style={styles.image} />
        </View>
      </React.Fragment>
    );
  };
  
  const styles = EStyleSheet.create({
      login: {
          fontSize: "1.3rem",
          fontWeight: "bold",
          alignSelf: "center",
          paddingRight: "72%",
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
          height: "12%",
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
            top: "39rem",
        }
  
  })

export default LogInScreen;
