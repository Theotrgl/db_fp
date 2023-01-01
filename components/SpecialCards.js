import React from 'react'
import { View, StyleSheet } from "react-native"
import Carousel from 'react-native-snap-carousel'
import SpecialCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './SpecialCardItem'
import EStyleSheet from 'react-native-extended-stylesheet';
import { getSpecialItems } from './data'

const SpecialCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const [data, setData] = React.useState(null);
  const [render, setRender] = React.useState(null);
  
  React.useEffect(() => {
    async function fetchData() {
      const homeItems = await getSpecialItems();
      setData(homeItems);
    }

    fetchData();
    setRender(true);
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        layout= "default"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={SpecialCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}

      />
    </View>
  )
}

const styles = EStyleSheet.create({
    container: {
        zindex: 1,
        position: 'absolute',
        top: "24rem",
        
    }
})
export default SpecialCards;