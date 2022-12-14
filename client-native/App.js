import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStackNavigator from "./src/components/navigation/MainStackNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import setupInterceptors from "./src/services/setupInterceptors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setInit } from "./src/slices/authSlice";

export default function App() {
  const Stack = createNativeStackNavigator();

  //initialize the asyncstorage by dispatching setInit
  const getAsyncStorage = () => {
    return (dispatch) => {
      AsyncStorage.getItem("user").then((result) => {
        dispatch(setInit(JSON.parse(result)));
      });
    };
  };

  //Set up axios interceptor.
  setupInterceptors(store);
  // initialize the asyncstore
  store.dispatch(getAsyncStorage());

  return (
    <Provider store={store}>
      <PaperProvider>
        <MainStackNavigator />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
