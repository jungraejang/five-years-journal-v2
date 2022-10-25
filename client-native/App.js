import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import WelcomePage from "./src/components/pages/WelcomePage/WelcomePage.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/components/pages/LoginPage/LoginPage";
import SignUpPage from "./src/components/pages/SignUpPage/SignUpPage.jsx";
import MainStackNavigator from "./src/components/navigation/MainStackNavigator";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  const Stack = createNativeStackNavigator();

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
