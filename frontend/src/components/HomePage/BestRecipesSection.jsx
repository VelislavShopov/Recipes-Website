import { useEffect, useState } from "react";
import { fetchBestRecipes } from "../../http requests/recipes";
import classes from "./BestRecipesSection.module.css";

export default function BestRecipesSection() {
  const [bestRatedRecipes, setBestRatedRecipes] = useState([]);

  useEffect(() => {
    async function setRecipes() {
      const recipes = await fetchBestRecipes();
      setBestRatedRecipes(recipes);
    }

    setRecipes();
  }, []);

  return (
    <section className={classes.best_recipes_section}>
      <h1 className={classes.h1}>Top 3 Best Rated Recipes</h1>
      {bestRatedRecipes !== null &&
        bestRatedRecipes.map((recipe) => (
          <div key={recipe.id} className={classes.recipe_container}>
            <img
              src={recipe.image}
              className={classes.recipe_img}
              alt="recipe"
            />
            <div className={classes.recipe_info_container}>
              <h2 className={classes.recipe_title}>{recipe.name}</h2>
              <div>
                <p>{recipe.user.username}</p>
                <p>{recipe.publication_date}</p>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}
