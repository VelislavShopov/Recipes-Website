import axios from "axios";
import DEFAULT_URL from "./url";

export default async function registerUser(formData) {
  const user = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password1"),
    country: "Bulgaria",
  };

  try {
    const response = await axios.post(`${DEFAULT_URL}/accounts/create`, user);
    return { isComplete: true };
  } catch (e) {
    console.log(e);
    return { isComplete: false };
  }
}

export async function fetchUserData(token) {
  try {
    const response = await axios.get(`${DEFAULT_URL}/accounts/retrieve/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
