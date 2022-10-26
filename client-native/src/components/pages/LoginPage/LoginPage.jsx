import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, setIsLoggedIn } from "../../../slices/authSlice";
import { TextInput, Button } from "react-native-paper";
import {
  FacebookSocialButton,
  AppleSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import { loginUser } from "../../../slices/authSlice";
import { selectUser } from "../../../slices/authSlice";

const MAX_WIDTH = Dimensions.get("screen").width;
const MAX_HEIGHT = Dimensions.get("screen").height;

export default function LoginPage({ navigation }) {
  const [username, onChangeText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [hidePass, setHidePass] = useState(true);
  let isLoggedIn = useSelector(selectIsLoggedIn);
  console.log("inputs for login", username, password);

  let dispatch = useDispatch(loginUser);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="username"
          value={username}
          onChangeText={(username) => onChangeText(username)}
          placeholder="Enter your username"
          mode="outlined"
          style={styles.inputField}
          selectionColor="#000"
          activeOutlineColor="#000"
          textColor="#000"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(password) => onChangePassword(password)}
          placeholder="Enter your password"
          mode="outlined"
          style={styles.inputField}
          selectionColor="#000"
          activeOutlineColor="#000"
          textColor="#000"
          secureTextEntry={hidePass ? true : false}
          right={
            <TextInput.Icon
              icon={!hidePass ? "eye" : "eye-off"}
              onPress={() => setHidePass(!hidePass)}
            />
          }
        />
      </View>
      <View style={styles.troubleShootContainer}>
        <Text>Forgot your password?</Text>
        <Text>Forgot Your username?</Text>
      </View>
      <Button
        style={[styles.loginButton, styles.buttonShadow]}
        onPress={() => {
          dispatch(
            loginUser({
              username: username,
              password: password,
            })
          );
          // navigation.navigate("MainPage");
        }}
        buttonColor="white"
        textColor="black"
        // mode="outlined"
      >
        Login
      </Button>
      <FacebookSocialButton />
      <GoogleSocialButton />
      <AppleSocialButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  container: {
    backgroundColor: "#E7ECF3",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    width: 350,
    marginTop: 50,
  },
  inputField: {
    backgroundColor: "white",
    color: "black",
    height: 30,
    // marginTop: 30,
    padding: 10,
    width: "100%",
    fontSize: 14,
    marginTop: 20,
  },
  troubleShootContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
    marginTop: 5,
    marginBottom: 30,
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  loginButton: {
    // marginBottom: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: 200,
  },
});
