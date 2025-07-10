import { Link, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteRecipeById } from "../../http requests/recipes";
import { useAuth } from "../../context/AuthContext";

export default function RecipesList() {
  const params = useParams();

  const { authData } = useAuth();
  const loaderData = useLoaderData();

  const [recipes, setRecipes] = useState(loaderData.recipes.results);
  const [profileData, setProfileData] = useState(loaderData.profile);

  const auth = authData.user.username === params.username;

  function handleDeleteRecipe(recipeId) {
    deleteRecipeById(recipeId);
    setRecipes((oldstate) => {
      return oldstate.filter((item) => item.id !== recipeId);
    });
  }

  return (
    <div>
      <h1>
        {authData.user.username === params.username
          ? "My"
          : `${params.username}'s`}{" "}
        Recipes
      </h1>
      {authData.user.username === params.username && (
        <Link to="/recipes/add">Add</Link>
      )}
      {recipes !== null &&
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <img src={recipe.image} style={{ maxHeight: "5rem" }} />
            <div>
              <Link to={`/recipes/${recipe.slug}`}>{recipe.name}</Link>
              <p>{recipe.publication_date}</p>
              {auth && (
                <button onClick={() => handleDeleteRecipe(recipe.id)}>X</button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
