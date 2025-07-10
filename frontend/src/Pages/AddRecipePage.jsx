import axios from "axios";
import { Form, redirect } from "react-router-dom";
import AddRecipeSection from "../components/AddRecipe/AddRecipeSection";
import { fetchIngredients } from "../http requests/ingredients";

export default function AddRecipePage() {
  return <AddRecipeSection></AddRecipeSection>;
}

export async function addRecipeLoader() {
  try {
    const ingredients = await fetchIngredients();
    return { ingredients };
  } catch (error) {
    console.log(error);
  }
}
