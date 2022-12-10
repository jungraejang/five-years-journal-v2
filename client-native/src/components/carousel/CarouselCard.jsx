import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
export const SLIDER_WIDTH = Math.round(Dimensions.get("window").width);
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCard = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.header}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: ITEM_WIDTH * 0.75,
    height: 300,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // verticalAlign: "middle",
    borderWidth: 2,
  },
  header: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 20,
    paddingTop: 10,
    marginTop: 20,
    textAlign: "center",
    height: 50,
  },
});

export default CarouselCard;
