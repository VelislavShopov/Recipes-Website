import { useLoaderData } from "react-router-dom";
import { fetchRecipeBySlug } from "../http requests/recipes";
import RecipeDetailSection from "../components/RecipeDetail/RecipeDetailSection";

export default function RecipeDetailPage() {
  return <RecipeDetailSection></RecipeDetailSection>;
}

export async function recipeDetailLoader({ request, params }) {
  const recipe = await fetchRecipeBySlug(params.slug);
  return recipe;
}
