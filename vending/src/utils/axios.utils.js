import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

apiClient.interceptors.response.use(undefined, (error) => {
  // Errors handling
  console.log(error, "error...");
  const { response } = error;
  const { data } = response;
  if (data) {
    throw data.error;
  }
  throw response;
});

export default apiClient;
