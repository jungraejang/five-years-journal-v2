import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../../slices/authSlice";
import {
  selectUser,
  selectMessage,
  setMessage,
} from "../../../slices/authSlice";
import { TextInput, Button } from "react-native-paper";
import {
  FacebookSocialButton,
  AppleSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import { Link, useRoute } from "@react-navigation/native";

export default function SignUpPage() {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [passwordConfirm, onChangePasswordConfirm] = React.useState("");

  const [hidePass, setHidePass] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  let serverMessage = useSelector(selectMessage);
  let route = useRoute();

  let dispatch = useDispatch();

  let user = useSelector(selectUser);

  const handlePasswordInput = (password) => {
    password.length < 8
      ? setPasswordError("Password must be at least 8 characters")
      : setPasswordError("");
    onChangePassword(password);
  };

  const handlePasswordConfirm = (passwordConfirm) => {
    passwordConfirm === password
      ? setPasswordConfirmError("")
      : setPasswordConfirmError("Your password does not match");
    onChangePasswordConfirm(passwordConfirm);
  };

  useEffect(() => {
    console.log("route useeffect");
    dispatch(setMessage(""));
  }, [route]);

  useEffect(() => {
    console.log("message useeffect");

    //server message comes from auth controller backend.
    if (serverMessage === "Failed! Username is already in use!") {
      setUsernameError(serverMessage);
      setEmailError("");
    } else if (serverMessage === "Failed! Email is already in use!") {
      setUsernameError("");
      setEmailError(serverMessage);
    } else if (serverMessage === "User was registered successfully!") {
      dispatch(
        loginUser({
          username: username,
          password: password,
        })
      );
    } else {
      setUsernameError("");
      setEmailError("");
    }
  }, [serverMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.inputLabel}>
            <Text>Username</Text>
          </View>
          <View>
            <TextInput
              onChangeText={onChangeUsername}
              value={username}
              placeholder="Enter your username"
              mode="outlined"
              style={styles.inputField}
              selectionColor="#000"
              activeOutlineColor="#000"
              textColor="#000"
              outlineColor={usernameError ? "red" : "#000"}
            />
          </View>
          <Text style={styles.warningMessage}>{usernameError}</Text>
        </View>
        <View>
          <View style={styles.inputLabel}>
            <Text>Email</Text>
          </View>
          <TextInput
            onChangeText={onChangeEmail}
            value={email}
            keyboardType="email-address"
            mode="outlined"
            style={styles.inputField}
            selectionColor="#000"
            activeOutlineColor="#000"
            textColor="#000"
            outlineColor={emailError ? "red" : "#000"}
            placeholder="Enter your email"
          />
        </View>
        <Text style={styles.warningMessage}>{emailError}</Text>
        <View>
          <View style={styles.inputLabel}>
            <Text>Password</Text>
          </View>
          <TextInput
            value={password}
            onChangeText={(password) => handlePasswordInput(password)}
            placeholder="Enter your password"
            mode="outlined"
            style={styles.inputField}
            selectionColor="#000"
            activeOutlineColor="#000"
            textColor="#000"
            secureTextEntry={true}
          />
          <Text style={styles.warningMessage}>{passwordError}</Text>
        </View>
        <View>
          <View style={styles.inputLabel}>
            <Text>Confirm Password</Text>
          </View>
          <TextInput
            value={passwordConfirm}
            onChangeText={(passwordConfirm) =>
              handlePasswordConfirm(passwordConfirm)
            }
            placeholder="Re-enter your password"
            mode="outlined"
            style={styles.inputField}
            selectionColor="#000"
            activeOutlineColor="#000"
            textColor="#000"
            secureTextEntry={true}
          />
          <Text style={styles.warningMessage}>{passwordConfirmError}</Text>
        </View>
      </View>

      <Button
        style={[styles.signupButton, styles.buttonShadow]}
        buttonColor="white"
        textColor="black"
        onPress={() => {
          if (!passwordConfirmError && !passwordError) {
            dispatch(
              registerUser({
                username: username,
                email: email,
                password: password,
                roles: ["user"],
              })
            );
          }
        }}
      >
        Sign Up
      </Button>
      <FacebookSocialButton
        buttonText="Sign up with Facebook"
        textStyle={{ color: "#fff", marginLeft: 20, marginRight: 20 }}
        buttonViewStyle={{ width: 320, marginTop: 20 }}
      />
      <GoogleSocialButton
        buttonText="Sign up with Google"
        textStyle={{ color: "#000", marginLeft: 20, marginRight: 20 }}
        buttonViewStyle={{ width: 320 }}
      />
      <AppleSocialButton
        textStyle={{ color: "#fff", marginLeft: 20, marginRight: 20 }}
        buttonViewStyle={{ width: 320, backgroundColor: "black" }}
        logoStyle={{ tintColor: "white" }}
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
    width: 300,
  },
  container: {
    backgroundColor: "#FFF2CA",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    width: 320,
    marginTop: 40,
  },
  inputField: {
    backgroundColor: "white",
    color: "black",
    height: 30,
    // marginTop: 30,
    padding: 10,
    width: "100%",
    fontSize: 14,
  },
  troubleShootContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
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
  inputLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
    marginTop: 10,
  },
  warningMessage: {
    height: 15,
    color: "red",
    fontSize: 11,
  },
});
