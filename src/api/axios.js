import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5001",
  withCredentials: true,
});

export const updateAuthorizationHeader = () => {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
};

const createAxiosResponseInterceptor = () => {
  const interceptor = instance.interceptors.response.use(
    (response) => {
      console.log("response interceptor");
      return response;
    },
    (error) => {
      console.log("error interceptor");
      console.log(error.response.status);
      const config = error.response.config;
      // Reject promise if usual erro
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }
      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      instance.interceptors.response.eject(interceptor);

      return instance
        .get("/api/auth/refresh-token")
        .then((response) => {
          localStorage.setItem("token", response.data.message);
          updateAuthorizationHeader();
          config.headers["Authorization"] = "Bearer " + response.data.message;

          console.log("response 2");
          return instance.request(config);
        })
        .catch((error) => {
          console.log("error 2");
          //return Promise.reject(error);
        })
        .finally(() => {
          createAxiosResponseInterceptor();
        });
    }
  );
};

createAxiosResponseInterceptor();

export default instance;
