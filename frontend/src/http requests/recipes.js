import axios from "axios";

export async function newestRecipes() {
  const response = await axios.get("http://localhost:8000/recipes/newest");
  return response.data;
}

export async function getBestRatedRecipes() {
  const response = await axios.get("http://localhost:8000/recipes/best-rated");
  return response.data;
}

export async function getMyRecipes(pk) {
  const token = localStorage.getItem("token");
  let headers = null;
  if (token !== null) {
    headers = { headers: `Authorization:Token ${token}` };
  }
  const response = await axios.get(
    `http://localhost:8000/recipes/u/${pk}/`,
    headers
  );
  return response.data;
}

export async function deleteRecipe(recipeId) {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `http://localhost:8000/recipes/${recipeId}/`,
    {
      headers: `Authorization:Token ${token}`,
    }
  );
}
