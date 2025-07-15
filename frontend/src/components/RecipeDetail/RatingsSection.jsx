import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRating from "../UI/StarRating";
import classes from "./RatingsSection.module.css";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import StarRatingClickable from "../UI/StarRatingClickable";
import { useEffect, useState } from "react";
import {
  deleteRatingById,
  fetchRecipeBySlug,
} from "../../http requests/recipes";
import DeleteButton from "../UI/DeleteButton";

const STARS = ["5.0", "4.0", "3.0", "2.0", "1.0"];

export default function RatingsSection({ recipe, setRecipe }) {
  const { authData, isAuthenticated } = useAuth();
  const authenticated = isAuthenticated();

  function totalCountofRatinsPerStar(stars) {
    const arr = recipe.ratings.filter((rating) => rating.stars === stars);
    return arr.length;
  }

  const [isRated, setIsRated] = useState(null);

  useEffect(() => {
    if (authenticated && recipe && recipe.ratings) {
      const userRated = recipe.ratings.filter(
        (item) => String(item.user) === String(authData.user.id)
      );
      console.log(userRated);
      setIsRated(userRated.length === 0 ? null : userRated[0]);
    }
  }, [recipe, authData, authenticated]);

  async function handleReviewRemove() {
    const response = await deleteRatingById(isRated.id, recipe.slug);
    setIsRated(null);
    setRecipe(await fetchRecipeBySlug(recipe.slug));
  }

  console.log(isRated);

  return (
    <section className={classes.section}>
      <div className={classes.generalrating_container}>
        <p className={classes.avgstars}>{recipe.avg_stars}</p>
        <StarRating rating={recipe.avg_stars}></StarRating>
        <p>Total ratings: {recipe.ratings.length}</p>
      </div>
      <div className={classes.detailedstars_container}>
        {STARS.map((star, i) => {
          const count = totalCountofRatinsPerStar(star);
          const percentage =
            count === 0 ? 0 : (count / recipe.ratings.length) * 100;

          return (
            <div className={classes.star_container}>
              <p>
                {5 - i} <FontAwesomeIcon icon={solidStar}></FontAwesomeIcon>
              </p>
              <div>
                <span
                  className={classes.span}
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: "#ECFAE5",
                  }}
                >
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.rate_container}>
        {!authenticated && (
          <div>
            <Link to="/login/">Login</Link> to rate!
          </div>
        )}
        {authenticated &&
          isRated === null &&
          authData.user &&
          recipe.user.id !== authData.user.id && (
            <>
              <p>Rate:</p>
              <StarRatingClickable
                setRecipe={setRecipe}
                recipe={recipe}
                setIsRated={setIsRated}
              ></StarRatingClickable>
            </>
          )}
        {isRated !== null && (
          <>
            <p>
              You have already rated with {isRated.stars[0]}
              <FontAwesomeIcon
                icon={solidStar}
                style={{ color: "gold" }}
              ></FontAwesomeIcon>
            </p>
            <DeleteButton onClick={handleReviewRemove}></DeleteButton>
          </>
        )}
      </div>
    </section>
  );
}
