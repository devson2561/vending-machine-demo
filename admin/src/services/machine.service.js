import axios from "../utils/axios.utils";

const list = async () => {
  const res = await axios.get("/vending-machines");
  return res.data;
};
const create = async (body) => {
  const res = await axios.post("/vending-machines", body);
  return res.data;
};

const get = async (id) => {
  const res = await axios.get(`/vending-machines/${id}`);
  return res.data;
};

const update = async (id, body) => {
  const res = await axios.patch(`/vending-machines/${id}`, body);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`/vending-machines/${id}`);
  return res.data;
};

export default {
  list,
  get,
  create,
  update,
  remove
};
