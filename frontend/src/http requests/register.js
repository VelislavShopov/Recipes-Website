import axios from "axios";
import DEFAULT_URL from "./url";

export default async function registerUser(formData) {
  const user = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    username: formData.get("username"),
    password: formData.get("password"),
    country: "Bulgaria",
  };

  try {
    const response = await axios.post(`${DEFAULT_URL}/users/create`, user);
    return { isComplete: true };
  } catch (e) {
    console.log(e);
    return { isComplete: false };
  }
}
