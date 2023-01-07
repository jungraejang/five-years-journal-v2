import axios from "axios";
import * as constants from "../constants/constants";

const instance = axios.create({
  baseURL: constants.BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
