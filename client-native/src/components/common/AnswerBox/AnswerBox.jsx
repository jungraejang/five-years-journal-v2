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

function AnswerBox(props) {
  const [text, onChangeText] = React.useState("Useless Text");

  const [fontsLoaded] = useFonts({
    Chalkboard: require("../../../../assets/fonts/Chalkboard.ttf"),
    "Almendra-Bold": require("../../../../assets/fonts/Almendra-Bold.ttf"),
  });

  useEffect(() => {
    onChangeText(props.text);
  }, []);
  console.log("text", text);

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
            Nov 8, 2022
          </Text>
          <Text
            style={{
              color: "gray",
              fontFamily: "Chalkboard",
              marginBottom: 10,
            }}
          >
            10:50AM
          </Text>

          <TextInput
            value={text}
            multiline
            onChangeText={onChangeText}
            style={{
              color: "black",
              fontFamily: "Chalkboard",
              //   backgroundColor: "lightgray",
              //   border: "1px solid #EEEEEE",
              //   boxShadow: "1px 1px 0 #DDDDDD",
              display: "block",
              fontFamily: "'Marck Script',cursive",
              fontSize: "13px",
              lineHeight: "15px",
              //   margin: "2% auto",
              //   padding: "0px 0px 0 0px",
              resize: "none",
              height: "77px",
              width: "320px",
              backgroundImage:
                "-webkit-linear-gradient(top , transparent, transparent 14px,#aeb8cf 0)",
              WebkitBackgroundSize: "100% 15px",
              backgroundSize: "100% 15px",
            }}
          />
        </Card.Content>
        {/* 
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
      </Card>
    </>
  );
}

export default AnswerBox;
