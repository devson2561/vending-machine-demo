import axios from "../utils/axios.utils";

const list = async () => {
  const res = await axios.get("/vending-machines");
  return res.data;
};

export default {
  list
};
