import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../slices/authSlice";

export default function FeedPage() {
  let username = useSelector(selectUser);
  console.log("username", username);
  return (
    <View>
      <Text>Welcome {username.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
