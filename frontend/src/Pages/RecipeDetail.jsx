import { useLoaderData } from "react-router-dom";
import { fetchRecipeBySlug } from "../http requests/recipes";

export default function RecipeDetail() {
  const loaderData = useLoaderData();
  console.log(loaderData);

  return <section>{loaderData.name}</section>;
}

export async function recipeDetailLoader({ request, params }) {
  const recipe = await fetchRecipeBySlug(params.slug);
  return recipe;
}
