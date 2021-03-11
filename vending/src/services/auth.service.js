import axios from "../utils/axios.utils";

const login = async (body) => {
  const res = await axios.post("/user-accounts/login", body);
  return res.data;
};

export default {
  login
};
