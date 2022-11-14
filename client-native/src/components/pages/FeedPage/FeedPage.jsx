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
import Editor from "../../common/Editor/Editor";
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

export default function FeedPage({ navigation } = props) {
  const [rerender, setRerender] = useState(false);
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
  useEffect(() => {
    console.log("useeffect triggered", todayQuestion);
  }, [todayQuestion]);
  // useEffect(() => {
  //   console.log("useeffect question triggered");
  //   setRerender(!rerender);
  // }, [questionMessage]);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* <TextInputModal /> */}
      {todayQuestion && (
        <>
          <QuestionBox
            question={todayQuestion ? todayQuestion?.data?.question : null}
            navigation={navigation}
          />
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
