import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../slices/authSlice";
import QuestionBox from "../../common/QuestionBox/QuestionBox";
import AnswerBox from "../../common/AnswerBox/AnswerBox";
import { useEffect } from "react";
import {
  getTodayQuestion,
  selectTodayQuestion,
} from "../../../slices/questionSlice";

export default function FeedPage() {
  let dispatch = useDispatch();
  let todayQuestion = useSelector(selectTodayQuestion);
  let user = useSelector(selectUser);

  useEffect(() => {
    console.log("user", user);
    dispatch(getTodayQuestion({ postedBy: user?.username }));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <QuestionBox question={todayQuestion?.data.question} />
      <ScrollView>
        {todayQuestion?.data.answers.map((el, index) => {
          return <AnswerBox key={index} text={el.answer} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
