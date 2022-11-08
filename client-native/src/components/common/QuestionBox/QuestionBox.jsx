import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";

function QuestionBox() {
  const [fontsLoaded] = useFonts({
    Chalkboard: require("../../../../assets/fonts/Chalkboard.ttf"),
    "Almendra-Bold": require("../../../../assets/fonts/Almendra-Bold.ttf"),
  });
  return (
    <SafeAreaView style={styles.questionboxContainer}>
      <View style={styles.dayContainer}>
        <Text
          style={{
            fontSize: 35,
            backgroundColor: "lightgray",
            borderRadius: "100%",
            width: 40,
            height: 40,
            fontFamily: "Almendra-Bold",
            fontWeight: 100,
          }}
        >
          8
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <View style={styles.monthContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 50,
              fontFamily: "Almendra-Bold",
            }}
          >
            November
          </Text>
        </View>
        <View style={styles.questionView}>
          <Text style={{ fontFamily: "Chalkboard", fontWeight: 600 }}>
            What did I do today??
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questionboxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "flex-start",
    width: 350,
    height: 120,
    borderRadius: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },
  dayContainer: {
    width: 50,
    flexDirection: "row",
    // alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    height: 40,
    paddingTop: 15,
  },
  monthContainer: {
    height: 30,
    borderBottomWidth: 1,
    // marginLeft: 30,
  },
  questionContainer: {
    width: 250,
  },
  questionView: {
    marginLeft: 30,
    marginTop: 5,
  },
});

export default QuestionBox;
