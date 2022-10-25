import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../slices/authSlice";
import MainPage from "../pages/MainPage/MainPage";

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  let isLoggedIn = useSelector(selectIsLoggedIn);
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
