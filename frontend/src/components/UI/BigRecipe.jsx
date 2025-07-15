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
          <p>Cooking time: {recipe.cooking_time} minutes</p>
        </div>
        <hr></hr>
        <div>
          <div className={classes.rating_container}>
            <StarRating rating={recipe.avg_stars}></StarRating>
            <p>({recipe.ratings.length})</p>
          </div>
          <div className={classes.user_container}>
            <Link to={`users/${recipe.user.username}`}>
              <img
                src={recipe.user.profile.picture}
                style={{ maxHeight: "3rem" }}
              ></img>
            </Link>
            <Link to={`users/${recipe.user.username}`}>
              {recipe.user.username}
            </Link>
          </div>
          <div className={classes.details_button_container}>
            <Link
              to={`recipes/${recipe.slug}`}
              className={classes.animated_button}
            >
              <svg
                viewBox="0 0 24 24"
                className={classes.arr_2}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className={classes.text}>Details...</span>
              <span className={classes.circle}></span>
              <svg
                viewBox="0 0 24 24"
                className={classes.arr_1}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
