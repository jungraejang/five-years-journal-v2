import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
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
    marginTop: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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
