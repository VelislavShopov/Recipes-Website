import axios from "axios";
import { redirect } from "react-router-dom";

export default function AddRecipe() {
  return <></>;
}

export async function addRecipeLoader() {
  const token = localStorage.getItem("token");
  if (token === null) {
    return redirect("/");
  }
  try {
    const response = await axios.get("http://localhost:8000/users/approve/", {
      headers: `Authorization:Token ${token}`,
    });
  } catch (e) {
    return redirect("/");
  }
}
