import axios from "../utils/axios.utils";

const list = async (params) => {
  const res = await axios.get("/vending-machine-slots", { params });
  return res.data;
};
const create = async (body) => {
  const res = await axios.post("/vending-machine-slots", body);
  return res.data;
};

const get = async (id) => {
  const res = await axios.get(`/vending-machine-slots/${id}`);
  return res.data;
};

const update = async (id, body) => {
  const res = await axios.patch(`/vending-machine-slots/${id}`, body);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`/vending-machine-slots/${id}`);
  return res.data;
};

export default {
  list,
  get,
  create,
  update,
  remove
};
