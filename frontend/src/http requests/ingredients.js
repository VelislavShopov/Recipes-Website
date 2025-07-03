import axios from "axios";
import DEFAULT_URL from "./url";

export async function fetchIngredients() {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${DEFAULT_URL}/recipes/ingredients/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
}
