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
        <IconButton
          icon="plus-circle-outline"
          iconColor="black"
          style={{ width: 30, height: 30, marginTop: 10 }}
          size={30}
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
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E1D9EC",
    padding: 10,
    borderRadius: "50%",
    width: 120,
    height: 120,
    paddingTop: 30,
    textAlign: "center",
  },
  addAnswerText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default AddAnswerButton;
