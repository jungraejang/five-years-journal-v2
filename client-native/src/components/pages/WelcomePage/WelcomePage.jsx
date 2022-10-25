import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import CarouselComponent from "../../carousel/CarouselComponent";
import { useSelector } from "react-redux";
import { selectCarouselIndex } from "../../../slices/themeSlice";

const MAX_WIDTH = Dimensions.get("screen").width;
const MAX_HEIGHT = Dimensions.get("screen").height;

export default function WelcomePage({ navigation }) {
  let index = useSelector(selectCarouselIndex);
  /////////////////////////////export later as setting///////////////////////////////////
  const carouselItems = [
    {
      image: require("../../../../assets/carousel-images/undraw_Exams.png"),
      text: "Experience new style of journaling today",
    },
    {
      image: require("../../../../assets/carousel-images/undraw_Memory_storage.png"),
      text: "New level journaling just for you",
    },
    {
      image: require("../../../../assets/carousel-images/undraw_mobile_ux.png"),

      text: "The best journaling app ever - NY Times",
    },
    {
      image: require("../../../../assets/carousel-images/undraw_my_files.png"),

      text: "New stage of journaling evolution! - Time Megazine",
    },
    {
      image: require("../../../../assets/carousel-images/undraw_Questions.png"),

      text: "My new favorite app ever - Bill Gates(Citation needed)",
    },
  ];
  ///////////////////////////////////refactor and store in util folder///////////////////////////////////
  const themeSwitch = (index) => {
    switch (index) {
      case 0:
        return "#2A015D";
      case 1:
        return "#6E3391";
      case 2:
        return "#534E6E";
      case 3:
        return "#315973";
      case 4:
        return "#2A5C56";
    }
  };

  const backgroundStyle = {
    backgroundColor: themeSwitch(index),
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.carouselContainer}>
        <CarouselComponent carouselItems={carouselItems} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.loginButton, styles.buttonShadow]}
          onPress={() => navigation.navigate("Login")}
          buttonColor="white"
          textColor="black"
          // mode="outlined"
        >
          Login
        </Button>
        <Button
          buttonColor="white"
          style={[styles.signUpButton, styles.buttonShadow]}
          onPress={() => navigation.navigate("SignUp")}
          textColor="black"
          // mode="elevated"
        >
          Sign Up
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#2A015D",
    height: "100%",
    // overflow: "hidden",
  },
  carouselContainer: {
    marginTop: 100,
    height: 350,
    marginBottom: 30,
  },
  loginButton: {
    // marginBottom: 10,
    borderRadius: 5,
  },
  signUpButton: {
    marginTop: 20,
    borderRadius: 5,
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    elevation: 3,
  },
  appName: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    width: 150,
    marginTop: 30,
  },
});
