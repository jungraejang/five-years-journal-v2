import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import React from "react";
import CarouselComponent from "../../carousel/CarouselComponent";

const MAX_WIDTH = Dimensions.get("screen").width;

export default function WelcomePage({ navigation }) {
  const images = [
    "https://images.pexels.com/photos/2115695/pexels-photo-2115695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/4159435/pexels-photo-4159435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/5991465/pexels-photo-5991465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ];

  const carouselItems = [
    {
      image:
        "https://images.pexels.com/photos/2115695/pexels-photo-2115695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      text: "Experience new style of journaling today",
    },
    {
      image:
        "https://images.pexels.com/photos/4159435/pexels-photo-4159435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      text: "New level journaling just for you",
    },
    {
      image:
        "https://assets.imgix.net/hp/snowshoe.jpg?auto=compress&w=1260&h=750&fit=crop",
      text: "The best journaling app ever - NY Times",
    },
  ];

  return (
    <View style={styles.container}>
      <CarouselComponent
        carouselItems={carouselItems}
        style={styles.carousel}
      />
      <Text style={styles.appName}>Five Years Journal</Text>
      <Text style={styles.appMotto}>Leave your life's footprint...</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="LOGIN"
          style={styles.loginButton}
          onPress={() => navigation.navigate("LoginPage")}
        />
        <Button
          title="SIGN UP"
          color="black"
          style={styles.signUpButton}
          onPress={() => navigation.navigate("SignUpPage")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // width: MAX_WIDTH,
  },
  carousel: {},
  loginButton: {
    color: "blue",
    margin: 20,
    backgroundColor: "black",
  },
  signUpButton: {
    color: "red",
    margin: 20,
  },
  appName: {
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 30,
    textAlign: "center",
  },
  appMotto: {
    fontSize: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "column",
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    width: 150,
  },
});
