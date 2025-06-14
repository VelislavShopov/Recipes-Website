import axios from "axios";
import obtainToken from "./token";
export default async function sendRegisterData(formData) {
  const user = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    username: formData.get("username"),
    password: formData.get("password"),
    country: "Bulgaria",
  };

  try {
    const createResponse = await axios.post(
      "http://localhost:8000/users/",
      user
    );

    const token = await obtainToken({
      username: user.username,
      password: user.password,
    });

    localStorage.setItem("token", token.data.token);
  } catch (e) {
    console.log(e);
  }
}
