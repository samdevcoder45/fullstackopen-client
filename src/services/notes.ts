import axios from "axios";
// const baseUrl = "http://localhost:3001/api/notes";
// const baseUrl = "https://fullstackopen-api-run1.onrender.com/api/notes";
const baseUrl = "/api/notes";
let token: string | null = null;

const setToken = (newToken: null | string) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = async (newObject: object) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id: number, newObject: object) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  setToken,
};
