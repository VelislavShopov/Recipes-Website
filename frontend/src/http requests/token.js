import axios from "axios";
export default async function obtainToken(user) {
  try {
    const response = axios.post("http://localhost:8000/users/auth", user);

    return response;
  } catch (e) {
    console.log(e);
  }
}
