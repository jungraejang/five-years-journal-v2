import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, setIsLoggedIn } from "../../../slices/authSlice";

export default function LoginPage({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");
  let dispatch = useDispatch(setIsLoggedIn);
  let isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <SafeAreaView>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        keyboardType="email-address"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
      />
      <Text>Forgot your password?</Text>
      <Button
        title="Login"
        onPress={() => {
          dispatch(setIsLoggedIn(true));
          // navigation.navigate("MainPage");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
});
