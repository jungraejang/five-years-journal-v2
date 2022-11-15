import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.101:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
