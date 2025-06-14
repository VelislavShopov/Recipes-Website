import { Link, useLoaderData, useParams } from "react-router-dom";
import { getMyRecipes } from "../http requests/recipes";
import RecipesList from "../components/MyRecipesPage/RecipesList";

export default function MyRecipes() {
  const { auth } = useLoaderData();
  console.log(auth);
  const params = useParams();

  return (
    <>
      <h1>{auth ? "My" : `${params.username}'s`} Recipes</h1>
      {auth && <Link to="/recipes/add">Add</Link>}

      <RecipesList></RecipesList>
    </>
  );
}

export async function myRecipesLoader({ request, params }) {
  const recipes = await getMyRecipes(params.username);
  return recipes;
}
