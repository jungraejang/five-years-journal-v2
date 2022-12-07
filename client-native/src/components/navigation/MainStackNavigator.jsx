import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../slices/authSlice";
import MainPage from "../pages/MainPage/MainPage";
import Editor from "../common/Editor/Editor";
import ArchivePage from "../pages/ArchivePage/ArchivePage";
import FeedPage from "../pages/FeedPage/FeedPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../../services/auth.service";
import { setIsLoggedIn } from "../../slices/authSlice";

import { parseJwt } from "../../utils/parseJwt";
import { selectEditorMode, selectEditorText } from "../../slices/editorSlice";

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  let isLoggedIn = useSelector(selectIsLoggedIn);
  let editorMode = useSelector(selectEditorMode);
  const { user: currentUser } = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  //check for change in state.auth.user and take appropriate actions
  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        let res = await AsyncStorage.getItem("user");
        res = JSON.parse(res);
        if (res) {
          const decodedJwt = parseJwt(res.accessToken);
          if (decodedJwt.exp * 1000 < Date.now()) {
            authService.logout();
            dispatch(setIsLoggedIn(false));
          } else {
            dispatch(setIsLoggedIn(true));
          }
        }
      } catch (e) {}
    };
    getUserFromStorage();
  }, [currentUser]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" mode="modal">
        {!isLoggedIn && (
          <>
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
          </>
        )}

        {isLoggedIn && (
          <>
            <Stack.Screen
              name="MainPage"
              component={MainPage}
              // screenOptions={{ headerShown: false }}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen name="Feed" options={{ headerShown: true }}>
              {() => <FeedPage navigation={navigation} />}
            </Stack.Screen>
            <Stack.Screen name="Archive" component={ArchivePage} />
            <Stack.Screen name="Editor" component={Editor} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
