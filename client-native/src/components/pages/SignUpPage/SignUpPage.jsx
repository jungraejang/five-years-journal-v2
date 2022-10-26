import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../slices/authSlice";
import { selectUser } from "../../../slices/authSlice";

export default function SignUpPage() {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  // const [lastName, onChangeLastName] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  let dispatch = useDispatch(registerUser);

  let user = useSelector(selectUser);

  return (
    <SafeAreaView>
      <Text>First Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
      />
      {/* <Text>Last Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLastName}
        value={lastName}
      /> */}
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        keyboardType="email-address"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
      />
      <Text>Forgot your password?</Text>
      <Button
        title="Sign Up"
        color="black"
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
