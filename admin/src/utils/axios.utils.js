import axios from "axios";
import store from "store";

const apiClient = axios.create({
  baseURL: "http://localhost:8899/api"
});

apiClient.interceptors.request.use((request) => {
  const accessToken = store.get("accessToken");
  if (accessToken) {
    request.headers.Authorization = accessToken;
    request.headers.AccessToken = accessToken;
  }
  return request;
});

apiClient.interceptors.response.use(undefined, (error) => {
  // Errors handling
  const { response } = error;
  const { data } = response;
  if (data) {
    throw data.error;
  }
  throw response;
});

export default apiClient;
