import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";
import {
  selectFetchedQuestion,
  getQuestion,
  selectTodayQuestion,
} from "../../../slices/questionSlice";
import { useEffect } from "react";
import { selectUser } from "../../../slices/authSlice";
import AnswerBox from "../../common/AnswerBox/AnswerBox";

export default function ArchivePage() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  const [selectedDate, setSelectedDate] = useState(`${yyyy}-${mm}-${dd}`);
  let fetchedQuestion = useSelector(selectFetchedQuestion);
  let todayQuestion = useSelector(selectTodayQuestion);
  let user = useSelector(selectUser);
  let dispatch = useDispatch();

  console.log("datesssss", dd, mm, yyyy, fetchedQuestion);
  useEffect(() => {
    console.log("triggered useEffect Archive");
    dispatch(
      getQuestion({
        postedBy: user?.username,
        today: false,
        day: parseInt(selectedDate.split("-")[2]),
        month: parseInt(selectedDate.split("-")[1]),
      })
    );
  }, [selectedDate]);

  useEffect(() => {}, [fetchedQuestion]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Calendar
        initialDate={selectedDate}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelectedDate(day.dateString);
        }}
        onDayLongPress={(day) => {
          console.log("selected day, long press", day);
        }}
        monthFormat={"yyyy MMMM"}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // showWeekNumbers={true}
        enableSwipeMonths={true}
        theme={{
          // backgroundColor: "#E1D9EC",
          calendarBackground: "#E1D9EC",
          textSectionTitleColor: "#000",
          // textSectionTitleDisabledColor: "#d9e1e8",
          // selectedDayBackgroundColor: "#00adf5",
          // selectedDayTextColor: "#ffffff",
          // todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          // textDisabledColor: "#d9e1e8",
          // dotColor: "#00adf5",
          // selectedDotColor: "#ffffff",
          // arrowColor: "orange",
          // disabledArrowColor: "#d9e1e8",
          // monthTextColor: "blue",
          // indicatorColor: "blue",
          // textDayFontFamily: "monospace",
          // textMonthFontFamily: "monospace",
          // textDayHeaderFontFamily: "monospace",
          // textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          // textDayHeaderFontWeight: "300",
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16,
        }}
        style={{ margin: 20 }}
      />

      <ScrollView>
        {fetchedQuestion && (
          <Text
            style={{
              color: "#000",
              fontFamily: "Chalkboard",
              textAlign: "center",
              margin: 10,
            }}
          >
            {fetchedQuestion?.data?.question}
          </Text>
        )}
        {fetchedQuestion
          ? fetchedQuestion?.data?.answers.map((el, index) => {
              return <AnswerBox key={index} answerProps={el} />;
            })
          : todayQuestion?.data?.answers.map((el, index) => {
              return <AnswerBox key={index} answerProps={el} />;
            })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
