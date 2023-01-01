import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const SpecialCarhelper = (prop) => {
  const item = prop.object;
  const navigation = useNavigation();

  let genres = [];
  let cont = 0;
  while(item.item.game.genres.length > cont){
    genres.push(item.item.game.genres[cont].name.toUpperCase() + " ");
    cont += 1;
  }

  const object = {
    id: item.item.game.id,
    title: item.item.game.title,
    description: item.item.game.description,
    developer: item.item.game.developer,
    publisher: item.item.game.publisher,
    images: item.item.game.images,
    genre: genres,
    price: item.item.game.price,
    average_rating: item.item.game.average_rating,
  }

  return (
    <View style={styles.container1} key={item.index}>
      <TouchableHighlight style={styles.imageBox} underlayColor={'black'} onPress={() => navigation.navigate("GamePage", object)}>
        <Image
          source={{ uri: item.item.game.images[1]}}
          style={styles.image}
        />
      </TouchableHighlight>
      <Image style={styles.clock} source={null}/>
      <Text style={styles.type}>{genres}</Text>
      <Text style={styles.body}>{item.item.game.title}</Text>
      <Text style={styles.dur}></Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container1: {
      overflow: 'hidden',
      zIndex: 100,
      height: 200,
      right: 40,
      backgroundColor: 'white',
      borderRadius: 10,
      width: ITEM_WIDTH,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 3,
    },
    image: {
      position: 'relative',
      right: 10,
      width: ITEM_WIDTH + 22,
      height: 200,
      zIndex: 1
    },
  
    clock: {
      postion: 'absolute',
      marginTop: -150,
      zindex: 2,
      height: 17,
      width: 17,
      right: -15,
      top: 120,
      borderRadius: 70,
      backgroundColor: 'white',
      opacity: 0
    },
  
    dur:{
      postion: 'absolute',
      marginTop: -15,
      fontSize: 11,
      top: 76,
      left: 40,
      color: 'white',
      opacity: 0
    },
  
    type:{
      postion: 'absolute',
      marginTop: -15,
      fontSize: 11,
      top: 75,
      left: 15,
      color: 'white',
      fontWeight: 'bold'
    },
  
    body:{
      postion: 'absolute',
      marginTop: -15,
      fontSize: 15,
      top: 90,
      left: 15,
      color: 'white',
      fontWeight: 'bold'
    },
  
    imageBox:{
      zindex: 999,
      height: 200,
    }
  })

export default SpecialCarhelper;