/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { connect, useSelector } from "react-redux";
import { authenSelector } from "../redux/reducers/authenticator_reducer";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import GamePageScreen from "../screens/GamePage";
import LibGamePageScreen from "../screens/LibraryGamePage";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SearchScreen from "../screens/SearchScreen";
import LibraryScreen from "../screens/LibraryScreen";
import FriendListScreen from "../screens/FriendListScreen";
import ProfileScreen from "../screens/ProfileScreen";

import StartScreen from "../screens/StartUpScreen";
import SignUpScreen from "../screens/SignUp";
import LogInScreen from "../screens/LoginScreen";
import { UserStore } from "../redux/reducers/authenticator_reducer";
import CameraPage from "../screens/Camera";
import CartPageScreen from "../screens/CartScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  //possible change needed for re rendering method of the app of code below, unlikely to be future proof
  const [render, setRender] = React.useState(false);

  UserStore.subscribe(() => {
    let authentication: boolean = UserStore.getState().authen.authentication;
    setRender(authentication);
  });

  //this code below too
  console.log(render);
  //ternary operator used to check if user is authenticated and logged in
  //next few attempts should direct it immediately to the home page
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "light" ? DarkTheme : DefaultTheme}
    >
      {render ? <RootNavigator /> : <AuthenticationPages />}
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GamePage"
        component={GamePageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LibGamePage"
        component={LibGamePageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraPage"
        component={CameraPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartPage"
        component={CartPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
export const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { height: "9%", paddingBottom: 8 },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarActiveTintColor: "black",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerShown: false,
          title: "Library",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          tabBarActiveTintColor: "black",
        }}
      />
      <BottomTab.Screen
        name="FriendList"
        component={FriendListScreen}
        options={{
          headerShown: false,
          title: "Friends",
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          tabBarActiveTintColor: "black",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          tabBarActiveTintColor: "black",
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const StartStack = createNativeStackNavigator();

//authentication pages for connection to find a suitable correlation in the database
export const AuthenticationPages = () => {
  return (
    <StartStack.Navigator screenOptions={{ headerShown: false }}>
      <StartStack.Screen name="Start" component={StartScreen} />

      <StartStack.Screen name="SignUp" component={SignUpScreen} />

      <StartStack.Screen name="Login" component={LogInScreen} />
    </StartStack.Navigator>
  );
};
