import axiosInstance from "./api";
import TokenService from "./token.service";
// import { refreshToken } from "../actions/auth";
// import { useDispatch } from "react-redux";
import { refreshToken } from "../slices/authSlice";

const setupInterceptors = (store) => {
  //   let dispatch = useDispatch();

  let BASE_URL = "http://localhost:8080/api";

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== BASE_URL + "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: await TokenService.getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;
            dispatch(refreshToken(accessToken));
            await TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setupInterceptors;
