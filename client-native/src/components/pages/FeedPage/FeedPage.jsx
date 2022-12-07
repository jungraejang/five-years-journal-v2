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
  getQuestion,
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

  let dispatch = useDispatch();
  let user = useSelector(selectUser);

  const loadTodayQuestion = React.useCallback(async () => {
    try {
      dispatch(
        getQuestion({
          postedBy: user?.username,
          today: false,
          day: new Date().getDate(),
          month: new Date().getMonth() + 1,
        })
      );
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
      <View
        style={{
          alignSelf: "center",
          width: "250px",
          height: "35px",
          textAlign: "center",
          backgroundColor: "#E1D9EC",
          borderRadius: "30px",
          marginTop: "20px",
          // justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Question of the day
        </Text>
      </View>
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
