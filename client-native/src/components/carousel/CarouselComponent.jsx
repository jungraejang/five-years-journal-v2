import React, { useEffect } from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCard, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCard";
import { useSelector, useDispatch } from "react-redux";
import { selectCarouselIndex, setThemeIndex } from "../../slices/themeSlice";

function CarouselComponent({ carouselItems }) {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  let carouselIndex = useSelector(selectCarouselIndex);
  let dispatch = useDispatch(setThemeIndex);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={-18}
        ref={isCarousel}
        data={carouselItems}
        renderItem={CarouselCard}
        sliderWidth={SLIDER_WIDTH * 0.75}
        itemWidth={ITEM_WIDTH * 0.75}
        onSnapToItem={(index) => {
          setIndex(index);
          dispatch(setThemeIndex(index));
        }}
        useScrollView={true}
        inactiveSlideOpacity={0}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 1)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
}

export default CarouselComponent;
