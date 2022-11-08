import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../slices/authSlice";
import QuestionBox from "../../common/QuestionBox/QuestionBox";
import AnswerBox from "../../common/AnswerBox/AnswerBox";
export default function FeedPage() {
  let username = useSelector(selectUser);
  let textArr = [
    "Today I coded and it made me happy",
    "my div won't center and it is driving me insane",
    "another random text. Lorem Ipsum and all that",
  ];
  console.log("username", username);
  return (
    <View>
      <QuestionBox />
      {textArr.map((el) => {
        return <AnswerBox text={el} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
