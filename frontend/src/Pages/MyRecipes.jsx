import { Link, useParams } from "react-router-dom";
import { fetchRecipesByUser } from "../http requests/recipes";
import RecipesList from "../components/MyRecipesPage/RecipesList";
import { useAuth } from "../context/AuthContext";

export default function MyRecipes() {
  const { authData } = useAuth();
  const params = useParams();
  return (
    <>
      <h1>
        {authData.user.username === params.username
          ? "My"
          : `${params.username}'s`}{" "}
        Recipes
      </h1>
      {authData.user.username === params.username && (
        <Link to="/recipes/add">Add</Link>
      )}

      <RecipesList></RecipesList>
    </>
  );
}

export async function myRecipesLoader({ request, params }) {
  const recipes = await fetchRecipesByUser(params.username);
  console.log(recipes);
  return recipes;
}
