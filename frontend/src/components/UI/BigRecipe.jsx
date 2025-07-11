import classes from "./BigRecipe.module.css";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
export default function BigRecipe({ recipe, ...props }) {
  const ingredientNames = recipe.ingredients.map((item) => item.name);

  return (
    <div key={recipe.id} className={classes.recipe_container} {...props}>
      <img src={recipe.image} className={classes.recipe_img} alt="recipe" />
      <div className={classes.recipe_info_container}>
        <div className={classes.recipe_name}>
          <Link to={`recipes/${recipe.slug}`}>{recipe.name}</Link>
        </div>
        <hr></hr>
        <div className={classes.additional_info_container}>
          <p>Ingredients: {ingredientNames.join(", ")}</p>
          <p>Cooking time: {recipe.cooking_time}</p>
        </div>
        <hr></hr>
        <div>
          <div className={classes.rating_container}>
            <StarRating rating={recipe.avg_stars}></StarRating>
            <p>({recipe.ratings.length})</p>
          </div>
          <div className={classes.user_container}>
            <img
              src={recipe.user.profile.picture}
              style={{ maxHeight: "3rem" }}
            ></img>
            <Link to={`users/${recipe.user.username}`}>
              {recipe.user.username}
            </Link>
          </div>
          <div className={classes.details_button_container}>
            <Link to={`recipes/${recipe.slug}`}>More Details...</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
