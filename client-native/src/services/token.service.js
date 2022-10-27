import AsyncStorage from "@react-native-async-storage/async-storage";

const getLocalRefreshToken = async () => {
  try {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    return user?.refreshToken;
  } catch (e) {}
};

const getLocalAccessToken = async () => {
  try {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    return user?.accessToken;
  } catch (e) {}
};

const updateLocalAccessToken = async (token) => {
  try {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    user.accessToken = token;
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    // save error
  }
};

const getUser = async () => {
  try {
    let user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  } catch (e) {
    console.error("getUser catch");
  }
};

const setUser = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    // save error
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (e) {
    // save error
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
