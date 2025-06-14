import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { deleteRecipe } from "../../http requests/recipes";

export default function RecipesList() {
  const loaderData = useLoaderData();
  const [recipes, setRecipes] = useState(loaderData.recipes);
  const auth = loaderData.auth;

  function handleDeleteRecipe(recipeId) {
    deleteRecipe(recipeId);
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
