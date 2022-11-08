import React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";
import { useFonts } from "expo-font";

function AnswerBox(text) {
  console.log("text", text);
  const [fontsLoaded] = useFonts({
    Chalkboard: require("../../../../assets/fonts/Chalkboard.ttf"),
    "Almendra-Bold": require("../../../../assets/fonts/Almendra-Bold.ttf"),
  });
  return (
    <>
      <Card
        style={{
          backgroundColor: "white",
          width: 350,
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Card.Content>
          <Text style={{ color: "gray", fontFamily: "Chalkboard" }}>
            Nov 8, 2022
          </Text>
          <Text style={{ color: "gray", fontFamily: "Chalkboard" }}>
            10:50AM
          </Text>
          <Paragraph style={{ color: "black", fontFamily: "Chalkboard" }}>
            {text.text}
          </Paragraph>
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
