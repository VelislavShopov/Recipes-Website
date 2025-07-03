import axios from "axios";
import { Form, redirect } from "react-router-dom";
import AddRecipeSection from "../components/AddRecipe/AddRecipeSection";
import { fetchIngredients } from "../http requests/ingredients";

export default function AddRecipe() {
  return <AddRecipeSection></AddRecipeSection>;
}

export async function addRecipeLoader() {
  const ingredients = await fetchIngredients();
  return { ingredients };
}
