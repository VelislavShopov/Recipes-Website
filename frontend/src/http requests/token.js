import axios from "axios";
import DEFAULT_URL from "./url";

export default async function obtainToken(user) {
  try {
    const response = await axios.post(`${DEFAULT_URL}/accounts/auth`, user);

    return response.data.token;
  } catch (e) {
    throw e;
  }
}
