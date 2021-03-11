import axios from "../utils/axios.utils";

const list = async () => {
  const res = await axios.get("/products");
  return res.data;
};

export default {
  list
};
