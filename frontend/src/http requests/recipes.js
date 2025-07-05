import axios from "axios";
import DEFAULT_URL from "./url";

export async function fetchNewestRecipes() {
  const response = await axios.get(`${DEFAULT_URL}/recipes/newest`);
  return response.data;
}

export async function fetchBestRecipes() {
  const response = await axios.get(`${DEFAULT_URL}/recipes/best-rated`);
  return response.data;
}

export async function fetchRecipesByUser(pk) {
  const token = localStorage.getItem("token");
  let headers = null;
  if (token !== null) {
    headers = { Authorization: `Token ${token}` };
  }
  const response = await axios.get(`${DEFAULT_URL}/recipes/u/${pk}/`, headers);
  return response.data;
}

export async function deleteRecipeById(recipeId) {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `${DEFAULT_URL}/recipes/${recipeId}/delete/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
}

export async function fetchRecipes(filters) {
  const response = await axios.get(`${DEFAULT_URL}/recipes/`, {
    params: filters,
  });

  return response.data;
}

export async function createRecipe(recipe) {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${DEFAULT_URL}/recipes/create/`, recipe, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
}

export async function fetchRecipeBySlug(slug) {
  const response = await axios.get(`${DEFAULT_URL}/recipes/${slug}`);

  return response.data;
}
