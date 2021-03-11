import axios from "../utils/axios.utils";

const list = async () => {
  const res = await axios.get("/products");
  return res.data;
};
const create = async (body) => {
  const res = await axios.post("/products", body);
  return res.data;
};

const get = async (id) => {
  const res = await axios.get(`/products/${id}`);
  return res.data;
};

const update = async (id, body) => {
  const res = await axios.patch(`/products/${id}`, body);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};

export default {
  list,
  get,
  create,
  update,
  remove
};
