import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../slices/authSlice";
import MainPage from "../pages/MainPage/MainPage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthVerify from "../common/AuthVerify";
import authService from "../../services/auth.service";
import { useRoute } from "@react-navigation/native";
import { setIsLoggedIn } from "../../slices/authSlice";

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  let isLoggedIn = useSelector(selectIsLoggedIn);

  const { user: currentUser } = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));

    const getUserFromStorage = async () => {
      try {
        let res = await AsyncStorage.getItem("user");
        // return JSON.parse(res);
        res = JSON.parse(res);
        if (res) {
          const decodedJwt = parseJwt(res.accessToken);

          if (decodedJwt.exp * 1000 < Date.now()) {
            // props.logOut();
            // dispatch()
            authService.logout();
          } else {
            dispatch(setIsLoggedIn(true));
          }
        }
      } catch (e) {}
    };
    // let user = getUserFromStorage();
    getUserFromStorage();
    console.log("user useeffect");
  }, [currentUser]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {!isLoggedIn && (
          <>
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
          </>
        )}
        {isLoggedIn && (
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            screenOptions={{ headerShown: false }}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
