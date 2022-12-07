import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Button, IconButton } from "react-native-paper";
import React from "react";
import { setEditorMode } from "../../../slices/editorSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

function AddAnswerButton({ navigation } = props) {
  let dispatch = useDispatch();
  const goToEditor = () => {
    console.log("button clicked");
    dispatch(setEditorMode(true));
    navigation.navigate("Editor");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goToEditor}>
        <Text style={styles.addAnswerText}>Answer today's question</Text>

        <Ionicons
          name="add-outline"
          iconColor="black"
          style={[
            styles.shadow,
            {
              width: 40,
              height: 40,
              backgroundColor: "#E1D9EC",
              borderRadius: "50%",
              marginTop: 10,
              alignSelf: "center",
            },
          ]}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: "50%",
    alignSelf: "center",
    marginTop: 30,
    alignItems: "center",
    flexDirection: "column",
    alignContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#B3A8D2",
    padding: 10,
    borderRadius: "50%",
    width: 160,
    height: 160,
    // paddingTop: 30,
    textAlign: "center",
    justifyContent: "center",
  },
  addAnswerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // shadow props for android
    elevation: 0.4,
  },
});

export default AddAnswerButton;
