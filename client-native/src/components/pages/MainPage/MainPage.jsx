import { StyleSheet, Text, SafeAreaView, Modal, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import {
  selectIsLoggedIn,
  setIsLoggedIn,
  logout,
} from "../../../slices/authSlice";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedPage from "../FeedPage/FeedPage";
import ArchivePage from "../ArchivePage/ArchivePage";
import Editor from "../../common/Editor/Editor";
import {
  selectEditorMode,
  setEditorMode,
  selectEditorText,
  onEditorTextChange,
  selectImage,
} from "../../../slices/editorSlice";
import { saveAnswer } from "../../../slices/questionSlice";
import { useRoute } from "@react-navigation/native";
import authService from "../../../services/auth.service";
import { useEffect } from "react";
import ImagePicker from "../../common/ImagePicker/ImagePicker";

export default function MainPage({ navigation } = props) {
  let dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  let editorMode = useSelector(selectEditorMode);
  let today = new Date().toISOString();
  let editorText = useSelector(selectEditorText);
  const { user: currentUser } = useSelector((state) => state.auth);
  const route = useRoute();
  let image = useSelector(selectImage);

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
        <Tab.Screen
          name="Archive"
          component={ArchivePage}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#6750A4" : "black" }}>
                Archive
              </Text>
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              color: "#000",
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Feather
                  name="archive"
                  size={20}
                  color={focused ? "#6750A4" : "black"}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Feed"
          options={{
            tabBarLabelStyle: {
              fontSize: 12,
              color: "#000",
            },
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#6750A4" : "black" }}>Home</Text>
            ),

            tabBarIcon: ({ focused }) => {
              return (
                <Feather
                  name="home"
                  size={20}
                  color={focused ? "#6750A4" : "black"}
                />
              );
            },
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
            headerRight: () =>
              editorMode ? (
                <IconButton icon="pencil"></IconButton>
              ) : (
                <IconButton
                  iconColor="black"
                  icon="account-circle"
                  onPress={() => {
                    authService.logout();
                    dispatch(logout());
                    // navigation.navigate("Login");
                  }}
                ></IconButton>
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
                <View style={{ flexDirection: "row", display: "flex" }}>
                  <ImagePicker />
                  <IconButton
                    onPress={() => {
                      //finish save answer first
                      console.log("button clicked");
                      dispatch(
                        saveAnswer({
                          answer: editorText,
                          postedBy: currentUser.username,
                          postedAt: today,
                          image: image,
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
                </View>
              ) : null,
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
