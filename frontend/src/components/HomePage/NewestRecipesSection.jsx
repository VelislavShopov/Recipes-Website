import { useLoaderData } from "react-router-dom";
import classes from "./NewestRecipesSection.module.css";
import StarRating from "../UI/StarRating";
import { Link } from "react-router-dom";
import BigRecipe from "../UI/BigRecipe";
import SmallRecipe from "../UI/SmallRecipe";
import { useState } from "react";
import axios from "axios";

export default function NewestRecipesSection() {
  const loaderData = useLoaderData();
  console.log(loaderData);
  const [recipes, setRecipes] = useState(loaderData);

  const firstRecipe = recipes.results[0];
  const results = recipes.results.filter((item, i) => i !== 0);

  async function handlePageChange(url) {
    if (url === null) {
      return;
    }

    const response = await axios.get(url);

    setRecipes(response.data);
  }

  return (
    <>
      <section className={classes.section}>
        <div className={classes.title_container}>
          <button
            onClick={() => handlePageChange(recipes.previous_page)}
            disabled={recipes.previous_page === null}
          >
            &#x25C0;
          </button>
          <h1 className={classes.h1}>New Recipes</h1>
          <button
            onClick={() => handlePageChange(recipes.next_page)}
            disabled={recipes.next_page === null}
          >
            &#x25B6;
          </button>
        </div>
        <BigRecipe
          recipe={firstRecipe}
          style={{ gridColumn: "1/3" }}
        ></BigRecipe>
        {results.map((recipe) => (
          <SmallRecipe recipe={recipe}></SmallRecipe>
        ))}
      </section>
    </>
  );
}
