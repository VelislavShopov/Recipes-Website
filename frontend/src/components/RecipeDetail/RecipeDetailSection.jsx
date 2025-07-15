import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import classes from "./RecipeDetailSection.module.css";
import StarRating from "../UI/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-regular-svg-icons";
import RatingsSection from "./RatingsSection";

export default function RecipeDetailSection() {
  const loaderData = useLoaderData();
  const [recipe, setRecipe] = useState(loaderData);

  return (
    <>
      <section className={classes.section}>
        <div className={classes.titleuser_container}>
          <h1 className={classes.h1}>{recipe.name}</h1>
          <div>
            <p>{recipe.publication_date_time}</p>
            <div className={classes.userinfo_container}>
              <p>By: </p>
              <Link to={`/users/${recipe.user.username}`}>
                {recipe.user.first_name} {recipe.user.last_name} (
                {recipe.user.username})
              </Link>
            </div>
          </div>
        </div>
        <hr></hr>
        <img src={recipe.image} className={classes.recipe_img} />
        <hr></hr>
        <div className={classes.ingredients_container}>
          <h2 className={classes.h2}>Ingredients:</h2>
          <ol>
            {recipe.ingredients.map((item, index) => {
              return (
                <li>
                  {index + 1}. {item.name}
                </li>
              );
            })}
          </ol>
        </div>
        <div className={classes.instructions_container}>
          <h2 className={classes.h2}>Instructions:</h2>
          <p>{recipe.description}</p>
        </div>
      </section>
      <hr></hr>
      <RatingsSection recipe={recipe} setRecipe={setRecipe}></RatingsSection>
    </>
  );
}
