import axios from "axios";
import DEFAULT_URL from "./url";
import AddIngredient from "../components/RecipeDetail/AddIngredient";

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

export async function fetchLongestCookingTime() {
  const response = await axios.get(
    `${DEFAULT_URL}/recipes/longest-cooking-time`
  );
  return response.data;
}

export async function createRatingForRecipe(stars, recipe_slug) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${DEFAULT_URL}/recipes/${recipe_slug}/ratings/create/`,
    { stars },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteRatingById(id, recipe_slug) {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `${DEFAULT_URL}/recipes/${recipe_slug}/ratings/${id}/delete/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
}

export async function patchRecipe(id, recipe) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  for (const key in recipe) {
    formData.append(key, recipe[key]);
  }

  const response = await axios.patch(
    `${DEFAULT_URL}/recipes/${id}/edit/`,
    formData,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteIngredientForRecipe(ingredientId, recipeId) {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `${DEFAULT_URL}/recipes/${recipeId}/delete-ingredient/${ingredientId}/`,
    { headers: { Authorization: `Token ${token}` } }
  );
}

export async function fetchIngredients() {
  const response = await axios.get(`${DEFAULT_URL}/recipes/ingredients`);
  return response.data;
}

export async function AddIngredientToRecipe(ingredientId, recipeId) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${DEFAULT_URL}/recipes/${recipeId}/add-ingredient/${ingredientId}/`,
    null,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
}
