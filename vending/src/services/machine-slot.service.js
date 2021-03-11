import axios from "../utils/axios.utils";

const list = async (params) => {
  const res = await axios.get("/vending-machine-slots", { params });
  return res.data;
};
const buy = async (id) => {
  const res = await axios.post("/vending-machine-slots/buy", { id });
  return res.data;
};
export default {
  list,
  buy
};
