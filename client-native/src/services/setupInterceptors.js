import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../slices/authSlice";
import * as constants from "../constants/constants";
const setupInterceptors = (store) => {
  //Export it to env file
  let BASE_URL = constants.BASE_URL;

  //use interceptor for requests
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await TokenService.getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;

  //use interceptor for responses
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
