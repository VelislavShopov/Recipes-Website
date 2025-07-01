import axios from "axios";
import DEFAULT_URL from "./url";
export default async function obtainToken(user) {
  try {
    const response = await axios.post(`${DEFAULT_URL}/users/auth`, user);

    return response.data.token;
  } catch (e) {
    throw e;
  }
}

export async function fetchUserData(token) {
  try {
    const response = await axios.get(`${DEFAULT_URL}/users/retrieve/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
