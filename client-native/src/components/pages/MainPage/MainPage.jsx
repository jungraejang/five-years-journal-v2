import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, setIsLoggedIn } from "../../../slices/authSlice";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedPage from "../FeedPage/FeedPage";
import ArchivePage from "../ArchivePage/ArchivePage";

export default function MainPage({ navigator }) {
  let dispatch = useDispatch(setIsLoggedIn);
  let isLoggedIn = useSelector(selectIsLoggedIn);
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="Archive" component={ArchivePage} />
      <Tab.Screen name="Feed" component={FeedPage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
