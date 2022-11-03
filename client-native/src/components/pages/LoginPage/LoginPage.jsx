import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  setIsLoggedIn,
  selectMessage,
} from "../../../slices/authSlice";
import { TextInput, Button } from "react-native-paper";
import {
  FacebookSocialButton,
  AppleSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import { loginUser, setMessage } from "../../../slices/authSlice";
import { selectUser } from "../../../slices/authSlice";
import { Link, useRoute } from "@react-navigation/native";

const MAX_WIDTH = Dimensions.get("screen").width;
const MAX_HEIGHT = Dimensions.get("screen").height;

export default function LoginPage({ navigation }) {
  const [username, onChangeText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [hidePass, setHidePass] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let isLoggedIn = useSelector(selectIsLoggedIn);
  let serverMessage = useSelector(selectMessage);

  let dispatch = useDispatch();

  let route = useRoute();

  useEffect(() => {
    console.log("route useeffect");
    dispatch(setMessage(""));
  }, [route]);

  useEffect(() => {
    console.log("message useeffect", serverMessage);

    //server message comes from auth controller backend.
    if (serverMessage === "User Not Found") {
      setUsernameError(serverMessage);
      setPasswordError("");
    } else if (serverMessage === "Invalid Password") {
      setUsernameError("");
      setPasswordError(serverMessage);
    } else {
      setUsernameError("");
      setPasswordError("");
    }
  }, [serverMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputLabel}>
          <Text>Username</Text>
          <Text style={styles.forgotCredential}>Forgot Username</Text>
        </View>
        <TextInput
          // label="username"
          value={username}
          onChangeText={(username) => onChangeText(username)}
          placeholder="Enter your username"
          mode="outlined"
          style={styles.inputField}
          selectionColor="#36454F"
          activeOutlineColor="#36454F"
          textColor="#36454F"
          outlineColor={usernameError ? "red" : "#000"}
        />
        <Text style={styles.warningMessage}>{usernameError}</Text>
        <View style={styles.inputLabel}>
          <Text>Password</Text>
          <Text style={styles.forgotCredential}>Forgot Password</Text>
        </View>
        <TextInput
          // label="Password"
          value={password}
          onChangeText={(password) => onChangePassword(password)}
          placeholder="Enter your password"
          mode="outlined"
          style={styles.inputField}
          selectionColor="#36454F"
          activeOutlineColor="#36454F"
          textColor="#36454F"
          secureTextEntry={hidePass ? true : false}
          right={
            <TextInput.Icon
              icon={!hidePass ? "eye" : "eye-off"}
              onPress={() => setHidePass(!hidePass)}
            />
          }
          outlineColor={passwordError ? "red" : "#000"}
        />
        <Text style={styles.warningMessage}>{passwordError}</Text>
      </View>
      <View style={styles.loginButtonContainer}>
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
        >
          <Text style={{ fontSize: 12 }}>Sign In</Text>
        </Button>
      </View>
      <View style={styles.socialLoginContainer}>
        <FacebookSocialButton
          textStyle={{ color: "#fff", marginLeft: 20, marginRight: 20 }}
          buttonViewStyle={{ width: 320 }}
        />
        <GoogleSocialButton
          textStyle={{ color: "#000", marginLeft: 20, marginRight: 20 }}
          buttonViewStyle={{ width: 320 }}
        />
        <AppleSocialButton
          textStyle={{ color: "#fff", marginLeft: 20, marginRight: 20 }}
          buttonViewStyle={{ width: 320, backgroundColor: "black" }}
          logoStyle={{ tintColor: "white" }}
        />
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 12 }}>
          Don't have an account?{" "}
          <Text style={{ fontSize: 11, color: "blue" }}>Sign up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5F0FF",
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
    width: 320,
    marginTop: 20,
  },
  inputField: {
    backgroundColor: "white",
    color: "black",
    height: 30,
    // marginTop: 30,
    padding: 10,
    width: "100%",
    fontSize: 15,
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
    marginTop: 10,
    fontSize: 12,
    // height: 35,
  },
  inputLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
    marginTop: 10,
  },
  forgotCredential: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 10,
  },
  warningMessage: {
    height: 15,
    color: "red",
    fontSize: 11,
  },
  loginButtonContainer: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "flex-end",
    width: 320,
  },
  socialLoginContainer: {
    marginTop: 20,
  },
});
