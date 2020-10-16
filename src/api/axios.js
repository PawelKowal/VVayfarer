import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5001",
});

export const updateAuthorizationHeader = () => {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
};

export default instance;
