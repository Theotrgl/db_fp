import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { RootTabScreenProps } from "../types";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
import { access_store } from "../redux/reducers/access_token";
import ContentLoader, {
  FacebookLoader,
  InstagramLoader,
} from "react-native-easy-content-loader";
import api from "../DatabaseConn";
import { Button, Searchbar } from "react-native-paper";

const Item = (items: any) => {
  const navigation = useNavigation();
  console.log(items.data);
  var cont = 0;
  var output = [];

  while (cont < items.items) {
    const object: any = {
      id: items.data[cont].id,
      friend: items.data[cont].b.username,
    };

    output.push(
      <TouchableHighlight
        underlayColor={"transparent"}
        key={object.id}
        onPress={() => navigation.navigate("LibGamePage", object)}
      >
        <View style={styles.button}>
          <Image
            source={require("../assets/images/simple.jpg")}
            style={styles.image}
          />
          <Text style={styles.text}>
            {object.friend !== undefined ? object.friend : "Undefined"}
          </Text>
        </View>
      </TouchableHighlight>
    );
    cont++;
  }
  return output;
};

const FriendListScreen = ({ navigation }: RootTabScreenProps<"Library">) => {
  const [response, setResponse] = React.useState("");
  const [showBox, setShowBox] = React.useState(true);
  const [isloading, setIsLoading] = React.useState(true);
  const [render, setRender] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [users, setUsers] = React.useState(null as any);
  const [id, setId] = React.useState(null as any);
  const [refresh, setRefresh] = React.useState(0);

  const token = access_store.getState();
  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer" + " " + token.access.access_token,
        },
      };
      const res = await fetch(api + "/users/friendlist", options);
      try {
        const responseData: any = await res.json();
        return responseData;
      } catch (err) {
        console.log(err);
        const res = await fetch(api + "/users/friendlist", options);
        const responseData: any = await res.json();
        return responseData;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserId = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer" + " " + token.access.access_token,
        },
      };
      const res = await fetch(api + "/users/me", options);
      const responseData: any = await res.json();
      return responseData;
    } catch (err) {
      console.log(err);
    }
  };

  async function main() {
    const response: any = await fetchData();
    const res = await fetchUserId();
    console.log(await response);
    if (response.length === 0) {
      console.log("empty");
    }
    if (res) {
      setId(res.id);
    }
    setResponse(response);
    if (response) {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    console.log("useEffect");
    main();
  }, [refresh]);

  const getUsers = React.useCallback(async () => {
    const response = await fetch(
      `${api}/friend/search?username=${searchQuery}`
    );
    const data = await response.json();
    setUsers(data);
  }, [searchQuery]);

  React.useEffect(() => {
    getUsers();
  }, [searchQuery, refresh]);

  const isFriend = (user: any) => {
    if (!user.friends && !user.symmetricfriends) {
      return false;
    }

    let b = false;
    user.friends.forEach((item: any) => {
      if (item.a_id === id || item.b_id === id) b = true;
    });

    user.symmetricfriends.forEach((item: any) => {
      if (item.a_id === id || item.b_id === id) b = true;
    });

    return b;
  };

  const addFriend = async (b_id: number) => {
    try {
      const response = await fetch(`${api}/friend/add`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Beaerer ${token.access.access_token}`,
        },
        body: JSON.stringify({ a_id: id, b_id, accepted: true }),
      });
      const data = await response.statusText;
      console.log(`res=${data}`);
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const items: number = response.length;
  const data: any = response;
  const specialStyles = EStyleSheet.create({
    libHeight: {
      height: 900,
    },
  });

  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.header}>
          {!isSearch ? (
            <Text style={styles.headerText}>Friends</Text>
          ) : (
            <TouchableHighlight
              style={styles.arrowBox}
              underlayColor={"transparent"}
              onPressIn={() => {
                setIsSearch(false);
              }}
            >
              <Image
                source={require("../assets/images/arrow-back.png")}
                style={styles.arrow}
              />
            </TouchableHighlight>
          )}
          <Searchbar
            style={[styles.searchbar, isSearch && { top: 16 }]} // adjust top if searchbar is out of place
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
            onPressIn={() => {
              setIsSearch(true);
            }}
          />
          {/* <TouchableHighlight
            style={styles.cartBox}
            underlayColor={"transparent"}
            onPress={() => navigation.navigate("CartPage")}
          >
            <Image
              source={require("../assets/images/cart.png")}
              style={styles.cart}
            />
          </TouchableHighlight> */}
        </View>
        {isSearch ? (
          <ScrollView>
            {users.length > 0 ? (
              users.map((user: any, index: number) => (
                <View key={index} style={styles.userListItem}>
                  <Image
                    source={require("../assets/images/simple.jpg")}
                    style={styles.image}
                  />
                  <View style={{ left: 16 * 2 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {user.username}
                    </Text>
                    <View>
                      <Button
                        style={[
                          {
                            marginTop: 8,
                            borderRadius: 16 * 0.5,
                            backgroundColor: "lightblue",
                          },
                          isFriend(user) || id === user.id
                            ? { backgroundColor: "gray", opacity: 0.3 }
                            : {},
                        ]}
                        onPress={async () => {
                          await addFriend(user.id);
                          setRefresh((prev) => prev + 1);
                        }}
                        disabled={isFriend(user) || id === user.id}
                      >
                        <Text style={{ fontWeight: "bold", color: "black" }}>
                          Add Friend
                        </Text>
                      </Button>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ marginLeft: 16, marginTop: 8, fontSize: 16 }}>
                No Result
              </Text>
            )}
          </ScrollView>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  setRefresh((prev) => prev + 1);
                }}
              />
            }
          >
            <View style={specialStyles.libHeight}>
              {data.length === 0 ? (
                <Text style={styles.friend}>You have no friends :(</Text>
              ) : isloading ? (
                <ContentLoader
                  active={true}
                  pRows={5}
                  title={false}
                  pHeight={110}
                  pWidth={390}
                />
              ) : (
                <Item items={items} data={data} />
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = EStyleSheet.create({
  header: {
    height: "5rem",
    backgroundColor: "white",
    elevation: 10,
  },

  headerText: {
    fontSize: "1.25rem",
    fontweight: "bold",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    fontfamily: "comic Sans",
  },

  button: {
    backgroundColor: "white",
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

  friend: {
    top: "2rem",
    fontSize: "1.1rem",
    alignSelf: "center",
  },

  cart: {
    height: "2rem",
    width: "2rem",
  },

  cartBox: {
    position: "absolute",
    top: "1.7rem",
    left: "22rem",
  },

  searchbar: {
    top: "-1.75rem",
    width: "18rem",
    alignSelf: "flex-end",
    marginRight: "1rem",
  },

  arrow: {
    height: "2rem",
    width: "2rem",
  },

  arrowBox: {
    position: "absolute",
    top: "1.7rem",
    left: "2rem",
  },
  userListItem: {
    flex: 1,
    flexDirection: "row",
    marginVertical: ".25rem",
  },
});
export default FriendListScreen;
