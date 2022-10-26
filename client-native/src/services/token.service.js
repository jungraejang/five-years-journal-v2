import AsyncStorage from "@react-native-async-storage/async-storage";

const getLocalRefreshToken = async () => {
  //   try {
  //     let user = await AsyncStorage.getItem("user");
  //     user = JSON.parse(user);
  //     return user?.refreshToken;
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  AsyncStorage.getItem("user")
    .then((data) => {
      let user = JSON.parse(data);
      console.log("getLocalRefreshToken", user);
      return user?.refreshToken;
    })
    .catch((e) => {
      console.log("error", e);
    });
};

const getLocalAccessToken = async () => {
  //   const user = await AsyncStorage.getItem("user");
  //   if (user) {
  //     user = JSON.parse(user);
  //   }
  //   return user?.accessToken;
  AsyncStorage.getItem("user")
    .then((data) => {
      let user = JSON.parse(data);
      console.log("getLocalAccessToken", user);

      return user?.accessToken;
    })
    .catch((e) => {
      console.log("error", e);
    });

  //   try {
  //     let user = await AsyncStorage.getItem("user");
  //     user = JSON.parse(user);
  //     return user?.accessToken;
  //   } catch (e) {
  //   }
};

const updateLocalAccessToken = async (token) => {
  try {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    user.accessToken = token;
    console.log("updateLocalAccessToken", user);
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    // save error
    console.log("setuser error", error);
  }
};

const getUser = async () => {
  //   let user = await AsyncStorage.getItem("user");
  //   if (user) {
  //     user = JSON.parse(user);
  //   }
  //   return user;
  AsyncStorage.getItem("user")
    .then((data) => {
      let user = JSON.parse(data);
      console.log("getUser", user);
      return user;
    })
    .catch((e) => {
      console.log("error", e);
    });
};

const setUser = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    // save error
    console.log("setuser error", error);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (e) {
    // save error
    console.log("setuser error", error);
  }
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
