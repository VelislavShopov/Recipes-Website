import axios from "axios";
import DEFAULT_URL from "./url";
export default async function obtainToken(user) {
  try {
    const response = axios.post(`${DEFAULT_URL}/users/auth`, user);

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserData(token) {
  try {
    console.log(token);
    const response = await axios.get(`${DEFAULT_URL}/users/approve/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
