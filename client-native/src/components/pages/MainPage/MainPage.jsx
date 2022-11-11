import { StyleSheet, Text, SafeAreaView, Modal } from "react-native";
import { Button, IconButton } from "react-native-paper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, setIsLoggedIn } from "../../../slices/authSlice";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedPage from "../FeedPage/FeedPage";
import ArchivePage from "../ArchivePage/ArchivePage";
import Editor from "../../common/Editor/Editor";
import {
  selectEditorMode,
  setEditorMode,
  selectEditorText,
  onEditorTextChange,
} from "../../../slices/editorSlice";
import { saveAnswer } from "../../../slices/questionSlice";
import { useRoute } from "@react-navigation/native";

export default function MainPage({ navigation } = props) {
  let dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  let editorMode = useSelector(selectEditorMode);
  let today = new Date().toISOString();
  let editorText = useSelector(selectEditorText);
  const { user: currentUser } = useSelector((state) => state.auth);
  const route = useRoute();

  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        //Hide specific tabs from bottom tabbar
        screenOptions={({ route }) => ({
          tabBarButton: ["Editor"].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
      >
        <Tab.Screen name="Archive" component={ArchivePage} options={{}} />

        <Tab.Screen
          name="Feed"
          options={{
            headerShown: true,
            title: "Feed",
            headerStyle: {
              backgroundColor: "#F3EDF7",
            },
            headerTintColor: "black",
            headerLeft: () =>
              editorMode ? (
                <IconButton
                  onPress={() => {
                    dispatch(setEditorMode(false));
                  }}
                  icon="pencil"
                  dark
                ></IconButton>
              ) : (
                <IconButton iconColor="black" icon="menu"></IconButton>
              ),
          }}
        >
          {() => <FeedPage navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Editor"
          component={Editor}
          options={{
            headerShown: true,
            title: "Editor",
            headerLeft: () =>
              editorMode ? (
                <IconButton
                  onPress={() => {
                    dispatch(setEditorMode(false));
                    navigation.navigate("Feed");
                  }}
                  icon="arrow-left"
                  iconColor="black"
                ></IconButton>
              ) : (
                <IconButton icon="menu">button</IconButton>
              ),
            headerRight: () =>
              editorMode ? (
                <IconButton
                  onPress={() => {
                    console.log("button clicked");
                    //finish save answer first
                    dispatch(
                      saveAnswer({
                        answer: editorText,
                        postedBy: currentUser.username,
                        postedAt: today,
                      })
                    )
                      .unwrap()
                      .then((res) => {
                        dispatch(onEditorTextChange(""));
                        dispatch(setEditorMode(false));
                        navigation.navigate("Feed");
                      })
                      .catch((e) => {
                        console.log("error", e);
                      });
                    // dispatch(onEditorTextChange(""));
                    // dispatch(setEditorMode(false));
                  }}
                  icon="check"
                  iconColor="black"
                ></IconButton>
              ) : null,
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
