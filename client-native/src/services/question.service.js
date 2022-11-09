import api from "./api";

//export it later to env variables
const API_URL = "http://localhost:8080/api/question/";

const getTodayQuestion = async ({ postedBy }) => {
  console.log("posted by", { postedBy });
  try {
    let res = await api.post(API_URL + "getTodayQuestion", {
      postedBy,
    });
    return res;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};

export default {
  getTodayQuestion,
};
