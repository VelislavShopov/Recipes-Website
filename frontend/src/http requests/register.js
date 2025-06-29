import axios from "axios";
import obtainToken from "./token";
import { useAuth } from "../context/AuthContext";
import DEFAULT_URL from "./url";

export default async function sendRegisterData(formData) {
  const user = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    username: formData.get("username"),
    password: formData.get("password"),
    country: "Bulgaria",
  };

  try {
    const createResponse = await axios.post(`${DEFAULT_URL}/users/`, user);
    return { isComplete: true };
  } catch (e) {
    console.log(e);
    return { isComplete: false };
  }
}
