import axios from "axios";
export default async function obtainToken(user) {
  try {
    const response = axios.post("http://localhost:8000/users/auth", user);

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserData(token) {
  try {
    const response = axios.get("http://localhost:8000/users/approve/", {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
