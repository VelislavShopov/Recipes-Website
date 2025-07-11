import { useEffect, useState } from "react";
import { fetchBestRecipes } from "../../http requests/recipes";
import classes from "./BestRecipesSection.module.css";
import { Link } from "react-router-dom";
import StarRating from "../UI/StarRating.jsx";
import BigRecipe from "../UI/BigRecipe.jsx";

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
    <section className={classes.section}>
      <h1 className={classes.h1}>Top 3 Best Rated Recipes</h1>
      {bestRatedRecipes !== null &&
        bestRatedRecipes.map((recipe) => (
          <BigRecipe recipe={recipe}></BigRecipe>
        ))}
    </section>
  );
}
