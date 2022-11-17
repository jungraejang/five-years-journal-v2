import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../slices/authSlice";
import QuestionBox from "../../common/QuestionBox/QuestionBox";
import AnswerBox from "../../common/AnswerBox/AnswerBox";
import { useEffect } from "react";
import {
  getTodayQuestion,
  selectTodayQuestion,
  selectMessage,
} from "../../../slices/questionSlice";
import { setEditorMode, selectEditorMode } from "../../../slices/editorSlice";
import TextInputModal from "../../common/TextInputModal/TextInputModal";
import {
  useRoute,
  useNavigationState,
  useFocusEffect,
} from "@react-navigation/native";
import AddAnswerButton from "../../common/AddAnswerButton/AddAnswerButton";

export default function FeedPage({ navigation } = props) {
  const [rerender, setRerender] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  let todayQuestion = useSelector(selectTodayQuestion);
  let questionMessage = useSelector(selectMessage);

  console.log("feed page loaded", todayQuestion, questionMessage);
  let dispatch = useDispatch();
  let user = useSelector(selectUser);

  const loadTodayQuestion = React.useCallback(async () => {
    try {
      dispatch(getTodayQuestion({ postedBy: user?.username }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadTodayQuestion();
    }, [])
  );

  const showAddButton = () => {
    if (todayQuestion?.data?.answers) {
      if (todayQuestion?.data?.answers?.length) {
        todayQuestion.data.answers.forEach((el) => {
          let postedYear = new Date(el.postedAt).getFullYear();
          console.log("posted year", postedYear, year);
          if (postedYear === year) {
            return true;
          }
        });
      } else {
        return true;
      }
    }
    return false;
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* <TextInputModal /> */}
      {todayQuestion && (
        <>
          <QuestionBox
            question={todayQuestion ? todayQuestion : null}
            navigation={navigation}
          />
          {showAddButton() && <AddAnswerButton navigation={navigation} />}
          <ScrollView>
            {todayQuestion ? (
              todayQuestion?.data?.answers.map((el, index) => {
                return <AnswerBox key={index} answerProps={el} />;
              })
            ) : (
              <> </>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
