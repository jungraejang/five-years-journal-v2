import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";

export default function SignUpPage() {
  const [firstName, onChangeFirstName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [lastName, onChangeLastName] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <SafeAreaView>
      <Text>First Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeFirstName}
        value={firstName}
      />
      <Text>Last Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLastName}
        value={lastName}
      />
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
      <Button title="Login" color="black" />
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
