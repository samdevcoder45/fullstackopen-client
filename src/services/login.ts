import axios from "axios";
const baseUrl = "/api/login";
interface Credentials {
  username: string;
  password: string;
}
const login = async (credentials: Credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default {
  login,
};
