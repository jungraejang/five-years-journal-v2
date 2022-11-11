import React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodayQuestion, saveAnswer } from "../../../slices/questionSlice";
import {
  onEditorTextChange,
  selectEditorText,
} from "../../../slices/editorSlice";

function Editor() {
  const [text, onChangeText] = React.useState("");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let today = new Date();
  let day = today.getDate();
  let month = monthNames[today.getMonth()];
  let year = today.getFullYear();
  useFonts({
    Chalkboard: require("../../../../assets/fonts/Chalkboard.ttf"),
    "Almendra-Bold": require("../../../../assets/fonts/Almendra-Bold.ttf"),
  });
  let question = useSelector(selectTodayQuestion);
  let editorText = useSelector(selectEditorText);
  let dispatch = useDispatch();
  console.log("questiopn", question.data, editorText);
  return (
    <View
      style={{
        alignSelf: "center",
        alignItems: "left",
        height: "50%",
        justifyContent: "center",
        height: 300,
        marginTop: 30,
      }}
    >
      <Text style={{ color: "#393434", fontFamily: "Chalkboard" }}>
        {question.data ? question?.data.question : ""}
      </Text>
      <Text style={{ color: "#393434", fontFamily: "Chalkboard" }}>
        {" "}
        {`${month}, ${day}, ${year}`}
      </Text>
      <View
        style={{
          backgroundColor: "#EEEEEE",
          width: 340,
          alignItems: "center",
        }}
      >
        <TextInput
          value={editorText}
          multiline
          onChangeText={(text) => dispatch(onEditorTextChange(text))}
          style={{
            color: "black",
            fontFamily: "Chalkboard",
            display: "block",
            fontFamily: "'Marck Script',cursive",
            fontSize: "13px",
            lineHeight: "15px",
            resize: "none",
            height: 250,
            width: "320px",
            backgroundImage:
              "-webkit-linear-gradient(top , transparent, transparent 14px,#aeb8cf 0)",
            WebkitBackgroundSize: "100% 15px",
            backgroundSize: "100% 15px",
            outlineStyle: "none",
            // paddingLeft: 5,
          }}
        />
      </View>
    </View>
  );
}

export default Editor;
