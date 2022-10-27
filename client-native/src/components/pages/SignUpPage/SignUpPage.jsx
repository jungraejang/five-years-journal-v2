import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../slices/authSlice";
import { selectUser } from "../../../slices/authSlice";
import { TextInput, Button } from "react-native-paper";
import {
  FacebookSocialButton,
  AppleSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";

export default function SignUpPage() {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  // const [lastName, onChangeLastName] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  let dispatch = useDispatch(registerUser);

  let user = useSelector(selectUser);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChangeUsername}
          value={username}
          label="username"
          placeholder="Enter your username"
          mode="outlined"
          style={styles.inputField}
          selectionColor="#000"
          activeOutlineColor="#000"
          textColor="#000"
        />
        <TextInput
          onChangeText={onChangeEmail}
          value={email}
          keyboardType="email-address"
          mode="outlined"
          style={styles.inputField}
          selectionColor="#000"
          activeOutlineColor="#000"
          textColor="#000"
          label="email"
        />
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          mode="outlined"
          style={styles.inputField}
          selectionColor="#000"
          activeOutlineColor="#000"
          textColor="#000"
          label="password"
        />
      </View>

      <Button
        style={[styles.signupButton, styles.buttonShadow]}
        buttonColor="white"
        textColor="black"
        onPress={() =>
          dispatch(
            registerUser({
              username: username,
              email: email,
              password: password,
              roles: ["user"],
            })
          )
        }
      >
        Sign Up
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
  signupButton: {
    // marginBottom: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 200,
  },
});
