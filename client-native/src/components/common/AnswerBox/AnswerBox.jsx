import React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";
import { SafeAreaView, StyleSheet, TextInput, Image, View } from "react-native";
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

  useEffect(() => {
    onChangeText(answerProps.answer);
  }, [answerProps]);

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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              pointerEvents: "none",
            }}
          >
            <TextInput
              value={text}
              multiline
              editable={false}
              selectTextOnFocus={false}
              onChangeText={onChangeText}
              style={{
                color: "black",
                fontFamily: "Chalkboard",
                display: "block",
                fontFamily: "'Marck Script',cursive",
                fontSize: 13,
                lineHeight: 15,
                resize: "none",
                height: 77,
                width: 230,
                backgroundImage:
                  "-webkit-linear-gradient(top , transparent, transparent 14px,#aeb8cf 0)",
                WebkitBackgroundSize: "100% 15px",
                backgroundSize: "100% 15px",
              }}
            />
            <Image
              source={{ uri: `${answerProps.image}` }}
              style={{ width: 77, height: 77, marginLeft: 10 }}
            />
          </View>
        </Card.Content>
      </Card>
    </>
  );
}

export default AnswerBox;
