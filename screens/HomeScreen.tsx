import React from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableHighlight,
  Modal,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { RootTabScreenProps } from "../types";
import { Searchbar, Chip, Button } from "react-native-paper";
import CarouselCards from "../components/CarouselCards";
import SpecialCards from "../components/SpecialCards";
import getHomeItems from "../components/data";
import EStyleSheet from "react-native-extended-stylesheet";
import SafeViewAndroid from "../components/SafeViewAndroid";
import api from "../DatabaseConn";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const SearchScreen = ({ setIsSearchVisible, navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchGame, setSearchGame] = React.useState(null as any);

  const getGames = React.useCallback(async () => {
    const response = await fetch(`${api}/game/search?title=${searchQuery}`);
    const data = await response.json();
    setSearchGame(data);
  }, [searchQuery]);

  React.useEffect(() => {
    getGames();
  }, [searchQuery]);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableHighlight
          style={styles.arrowBox}
          underlayColor={"transparent"}
          onPress={() => {
            setIsSearchVisible(false);
          }}
        >
          <Image
            source={require("../assets/images/arrow-back.png")}
            style={styles.arrow}
          />
        </TouchableHighlight>
        <ScrollView style={{ marginVertical: 32 }}>
          {searchGame &&
            searchGame.map((game: any, index: number) => (
              <TouchableHighlight
                key={index}
                underlayColor={"transparent"}
                onPress={() => {
                  navigation.push("GamePage", game);
                  setIsSearchVisible(false);
                }}
              >
                <View style={styles.popView}>
                  <Image
                    source={
                      game.images == null
                        ? require("../assets/images/simple.jpg")
                        : { uri: game.images["1"] }
                    }
                    style={styles.pop}
                  />
                  <Text style={styles.next}>
                    {game == null
                      ? "loading.."
                      : game.title.length < 15
                      ? game.title
                      : game.title.substr(0, 14) + ".."}
                  </Text>
                  <Text style={styles.subNext}>
                    {game == null ? "loading.." : game.platforms[0].platform}
                  </Text>
                  <Text style={styles.subNext}>
                    {game == null ? "loading.." : game.genres[0].name}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchModalVisible, setIsSearchVisible] = React.useState(false);

  const [data, setData] = React.useState(null);
  const [objectX, setX] = React.useState(null);
  const [objectY, setY] = React.useState(null);
  const [objectZ, setZ] = React.useState(null);
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const homeItems = await getHomeItems();
      setData(homeItems);
    }

    fetchData();
    setRender(true);
  }, []);

  if (data != null && render == true) {
    let genresX = [];
    let cont = 0;
    while (data[0].genres.length > cont) {
      genresX.push(data[0].genres[cont].name);
      cont++;
    }

    setX({
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      developer: data[0].developer,
      publisher: data[0].publisher,
      images: data[0].images,
      genre: genresX,
      price: data[0].price,
      average_rating: data[0].average_rating,
    });

    setRender(false);
  }

  if (data != null && render == true) {
    let genresY = [];
    let cont = 0;
    while (data[1].genres.length > cont) {
      genresY.push(data[1].genres[cont].name);
      cont++;
    }

    setY({
      id: data[1].id,
      title: data[1].title,
      description: data[1].description,
      developer: data[1].developer,
      publisher: data[1].publisher,
      images: data[1].images,
      genre: genresY,
      price: data[1].price,
      average_rating: data[1].average_rating,
    });

    setRender(false);
  }

  if (data != null && render == true) {
    let genresZ = [];
    let cont = 0;
    while (data[2].genres.length > cont) {
      genresZ.push(data[2].genres[cont].name);
      cont++;
    }

    setZ({
      id: data[2].id,
      title: data[2].title,
      description: data[2].description,
      developer: data[2].developer,
      publisher: data[2].publisher,
      images: data[2].images,
      genre: genresZ,
      price: data[2].price,
      average_rating: data[2].average_rating,
    });

    setRender(false);
  }

  return (
    <React.Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={styles.topView}>
          <Image
            source={require("../assets/images/minilogo.png")}
            style={styles.logo}
          />
          <TouchableHighlight
            style={styles.cartBox}
            underlayColor={"transparent"}
            onPress={() => navigation.navigate("CartPage")}
          >
            <Image
              source={require("../assets/images/cart.png")}
              style={styles.cart}
            />
          </TouchableHighlight>
          <Searchbar
            style={styles.searchbar}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onPressIn={() => setIsSearchVisible(true)}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.container}>
            <Text style={styles.features}>Featured & Recommended</Text>
            <CarouselCards />

            <Text style={[styles.features, styles.extra]}>Specials</Text>
            <SpecialCards />
          </View>
          <View style={styles.container2}>
            <Text style={styles.features}>Browse</Text>
            <Button
              style={[styles.button, { left: "5%" }]}
              color={"black"}
              uppercase={false}
            >
              Action
            </Button>
            <Button style={styles.button} color={"black"} uppercase={false}>
              RPG
            </Button>
            <Button
              style={[styles.button, { left: "5%", top: "55%" }]}
              color={"black"}
              uppercase={false}
            >
              Moba
            </Button>
            <Button
              style={[styles.button, { left: "37%", top: "55%" }]}
              color={"black"}
              uppercase={false}
            >
              Kids
            </Button>
            <Button
              style={[styles.button, { left: "68%" }]}
              color={"black"}
              uppercase={false}
            >
              Tactical
            </Button>
            <Button
              style={[styles.button, { left: "68%", top: "55%" }]}
              color={"black"}
              uppercase={false}
            >
              Horror
            </Button>
          </View>
          <View style={styles.container3}>
            <Text style={styles.features}>Popular Titles</Text>
            <TouchableHighlight
              underlayColor={"transparent"}
              onPress={() => navigation.navigate("GamePage", objectX)}
            >
              <View style={styles.popView}>
                <Image
                  source={
                    data == null
                      ? require("../assets/images/simple.jpg")
                      : { uri: data[0].images["1"] }
                  }
                  style={styles.pop}
                />
                <Text style={styles.next}>
                  {data == null
                    ? "loading.."
                    : data[0].title.length < 15
                    ? data[0].title
                    : data[0].title.substr(0, 14) + ".."}
                </Text>
                <Text style={styles.subNext}>
                  {data == null ? "loading.." : data[0].platforms[0].platform}
                </Text>
                <Text style={styles.subNext}>
                  {data == null ? "loading.." : data[0].genres[0].name}
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"transparent"}
              onPress={() => navigation.navigate("GamePage", objectY)}
            >
              <View style={styles.popView}>
                <Image
                  source={
                    data == null
                      ? require("../assets/images/simple.jpg")
                      : { uri: data[1].images["1"] }
                  }
                  style={styles.pop}
                />
                <Text style={styles.next}>
                  {data == null
                    ? "loading.."
                    : data[1].title.length < 15
                    ? data[1].title
                    : data[1].title.substr(0, 14) + ".."}
                </Text>
                <Text style={styles.subNext}>
                  {data == null ? "loading.." : data[1].platforms[0].platform}
                </Text>
                <Text style={styles.subNext}>
                  {data == null ? "loading.." : data[1].genres[0].name}
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"transparent"}
              onPress={() => navigation.navigate("GamePage", objectZ)}
            >
              <View style={styles.popView}>
                <Image
                  source={
                    data == null
                      ? require("../assets/images/simple.jpg")
                      : { uri: data[2].images["1"] }
                  }
                  style={styles.pop}
                />
                <Text style={styles.next}>
                  {data == null
                    ? "loading.."
                    : data[2].title.length < 15
                    ? data[2].title
                    : data[2].title.substr(0, 14) + ".."}
                </Text>
                <Text style={styles.subNext}>
                  {data == null ? "loading.." : data[2].platforms[0].platform}
                </Text>
                <Text style={styles.subNext}>
                  {data == null ? "loading.." : data[2].genres[0].name}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={isSearchModalVisible}
        onRequestClose={() => setIsSearchVisible(false)}
      >
        <SearchScreen
          setIsSearchVisible={setIsSearchVisible}
          navigation={navigation}
        />
      </Modal>
    </React.Fragment>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: "40rem",
  },

  container2: {
    height: "15rem",
  },

  container3: {
    height: "30rem",
  },

  topView: {
    height: "5rem",
    backgroundColor: "white",
    elevation: 10,
  },

  logo: {
    position: "absolute",
    height: "3rem",
    width: "2rem",
    top: "1.05rem",
    left: "1.2rem",
  },

  searchbar: {
    top: "1rem",
    width: "16rem",
    alignSelf: "center",
  },

  features: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    fontSize: "1rem",
    color: "black",
  },

  extra: {
    top: "13.5rem",
  },

  button: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "lightgray",
    width: "28%",
    height: "20%",
    top: "30%",
    borderRadius: 30,
    elevation: 2,
  },

  popView: {
    backgroundColor: "white",
    height: "6rem",
    margin: "1rem",
  },

  pop: {
    left: "1rem",
    width: "11rem",
    height: "6rem",
  },

  next: {
    fontSize: "1rem",
    left: "13rem",
    bottom: "5.5rem",
  },

  subNext: {
    fontSize: "0.7rem",
    left: "13rem",
    bottom: "5.5rem",
  },

  platform: {
    fontSize: "1rem",
    left: "13rem",
    bottom: "5.5rem",
  },

  genre: {
    fontSize: "1rem",
    left: "13rem",
    bottom: "5.5rem",
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

  arrowBox: {
    position: "absolute",
    top: "1.7rem",
    left: "1.5rem",
  },

  arrow: {
    height: "2rem",
    width: "2rem",
  },
});

export default HomeScreen;
