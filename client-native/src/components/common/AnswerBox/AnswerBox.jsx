import React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { today } from "../../../utils/today";

function AnswerBox({ answerProps } = props) {
  const [text, onChangeText] = React.useState("");

  useFonts({
    Chalkboard: require("../../../../assets/fonts/Chalkboard.ttf"),
    "Almendra-Bold": require("../../../../assets/fonts/Almendra-Bold.ttf"),
  });

  let postedDate = new Date(answerProps.postedAt);
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
  let day = postedDate.getDate();
  let month = monthNames[postedDate.getMonth()];
  let year = postedDate.getFullYear();
  console.log(postedDate);

  useEffect(() => {
    onChangeText(answerProps.answer);
  }, []);

  return (
    <>
      <Card
        mode="contained"
        style={{
          backgroundColor: "white",
          width: 350,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <Card.Content>
          <Text
            style={{ color: "gray", fontFamily: "Chalkboard", marginBottom: 5 }}
          >
            {`${month}, ${day}, ${year}`}
          </Text>
          <Text
            style={{
              color: "gray",
              fontFamily: "Chalkboard",
              marginBottom: 10,
            }}
          >
            {postedDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>

          <TextInput
            value={text}
            multiline
            onChangeText={onChangeText}
            style={{
              color: "black",
              fontFamily: "Chalkboard",
              display: "block",
              fontFamily: "'Marck Script',cursive",
              fontSize: "13px",
              lineHeight: "15px",
              resize: "none",
              height: "77px",
              width: 320,
              backgroundImage:
                "-webkit-linear-gradient(top , transparent, transparent 14px,#aeb8cf 0)",
              WebkitBackgroundSize: "100% 15px",
              backgroundSize: "100% 15px",
            }}
          />
        </Card.Content>
      </Card>
    </>
  );
}

export default AnswerBox;
