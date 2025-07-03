import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteRecipeById } from "../../http requests/recipes";
import { useAuth } from "../../context/AuthContext";

export default function RecipesList() {
  const params = useParams();
  const { authData } = useAuth();
  const loaderData = useLoaderData();
  const [recipes, setRecipes] = useState(loaderData.results);
  const auth = authData.user.username === params.username;
  console.log(authData.user);
  console.log(auth);

  function handleDeleteRecipe(recipeId) {
    deleteRecipeById(recipeId);
    setRecipes((oldstate) => {
      return oldstate.filter((item) => item.id !== recipeId);
    });
  }

  return (
    <section>
      {recipes !== null &&
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <img src={recipe.image} style={{ maxHeight: "5rem" }} />
            <div>
              <h2>{recipe.name}</h2>
              <p>{recipe.publication_date}</p>
              {auth && (
                <button onClick={() => handleDeleteRecipe(recipe.id)}>X</button>
              )}
            </div>
          </div>
        ))}
    </section>
  );
}
