import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { setEditorMode } from "../../../slices/editorSlice";

function QuestionBox({ question, navigation } = props) {
  useFonts({
    Chalkboard: require("../../../../assets/fonts/Chalkboard.ttf"),
    "Almendra-Bold": require("../../../../assets/fonts/Almendra-Bold.ttf"),
  });
  let dispatch = useDispatch();
  console.log(question);
  let months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return (
    <SafeAreaView style={styles.questionboxContainer}>
      <View style={styles.dayContainer}>
        <Text
          style={{
            fontSize: 30,
            backgroundColor: "lightgray",
            borderRadius: "100%",
            width: 40,
            height: 40,
            fontFamily: "Almendra-Bold",
            fontWeight: 100,
          }}
        >
          {question.data.day}
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <View style={styles.monthContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 50,
              fontFamily: "Almendra-Bold",
            }}
          >
            {months[question.data.month]}
          </Text>
        </View>
        <View style={styles.questionView}>
          <Text style={{ fontFamily: "Chalkboard", fontWeight: 500 }}>
            {question.data.question}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questionboxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "flex-start",
    width: 350,
    height: 120,
    borderRadius: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },
  dayContainer: {
    width: 50,
    flexDirection: "row",
    // alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    height: 40,
    paddingTop: 15,
  },
  monthContainer: {
    height: 30,
    borderBottomWidth: 1,
    // marginLeft: 30,
  },
  questionContainer: {
    width: 250,
  },
  questionView: {
    marginLeft: 30,
    marginTop: 5,
  },
});

export default QuestionBox;
