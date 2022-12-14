import api from "./api";

//export it later to env variables
const API_URL = "http://54.227.10.99:8080/api/question/";

const getTodayQuestion = async ({ postedBy, today, day, month }) => {
  try {
    let res = await api.post(API_URL + "getTodayQuestion", {
      postedBy,
      today,
      day,
      month,
    });
    return res;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};

const getQuestion = async ({ postedBy, today, day, month }) => {
  try {
    let res = await api.post(API_URL + "getQuestion", {
      postedBy,
      today,
      day,
      month,
    });
    return res;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};

const getDefaultQuestion = async ({}) => {
  try {
    let res = await api.post(API_URL + "getDefaultQuestion", {});
    console.log("question service res", res);

    return res;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};
const saveAnswer = async ({ answer, postedAt, postedBy, image }) => {
  try {
    let res = await api.post(API_URL + "saveAnswer", {
      answer,
      postedAt,
      postedBy,
      image,
    });
    return res;
  } catch (e) {
    let errorMessage = e.response.data.message;
    return Promise.reject(new Error(errorMessage));
  }
};

export default {
  getTodayQuestion,
  saveAnswer,
  getDefaultQuestion,
  getQuestion,
};
