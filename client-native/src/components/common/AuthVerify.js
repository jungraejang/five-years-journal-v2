import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let route = useRoute();

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));

    const getUserFromStorage = async () => {
      try {
        let res = await AsyncStorage.getItem("user");
        return JSON.parse(res);
      } catch (e) {}
    };
    let user = getUserFromStorage();
    console.log("user useeffect", user);
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [route, props]);

  return <></>;
};

export default AuthVerify;
