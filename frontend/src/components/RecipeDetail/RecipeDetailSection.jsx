import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import classes from "./RecipeDetailSection.module.css";
import RatingsSection from "./RatingsSection";
import { useAuth } from "../../context/AuthContext";
import EditButton from "../UI/EditButton";
import SubmitButton from "../UI/SubmitButton";

export default function RecipeDetailSection() {
  const loaderData = useLoaderData();
  const [recipe, setRecipe] = useState(loaderData);

  const { authData } = useAuth();

  const [isUserOwned, setIsUserOwned] = useState(
    authData !== null && recipe.user.id === authData.user.id
  );

  const [isEditing, setIsEditing] = useState(false);
  function handleSubmit() {
    setIsEditing(false);
  }

  function handleChange(e, type) {
    setRecipe((prev) => {
      return {
        ...prev,
        [type]: e.target.value,
      };
    });
  }

  console.log(recipe);

  return (
    <>
      <section className={classes.section}>
        <div className={classes.titleuser_container}>
          <div>
            {!isEditing && <h1 className={classes.h1}>{recipe.name}</h1>}
            {isEditing && (
              <input
                className={classes.input_h1}
                value={recipe.name}
                onChange={(e) => handleChange(e, "name")}
              ></input>
            )}
            {isUserOwned && (
              <div>
                {!isEditing && (
                  <EditButton onClick={() => setIsEditing(true)}></EditButton>
                )}
                {isEditing && (
                  <SubmitButton onClick={() => handleSubmit()}></SubmitButton>
                )}
              </div>
            )}
          </div>
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
                <li key={index + 1}>
                  {index + 1}. {item.name}
                </li>
              );
            })}
          </ol>
        </div>
        <div className={classes.instructions_container}>
          <h2 className={classes.h2}>Instructions:</h2>
          {!isEditing && <p>{recipe.description}</p>}
          {isEditing && (
            <textarea
              className={classes.textarea_description}
              value={recipe.description}
              onChange={(e) => handleChange(e, "description")}
            ></textarea>
          )}
        </div>
      </section>
      <hr></hr>
      <RatingsSection recipe={recipe} setRecipe={setRecipe}></RatingsSection>
    </>
  );
}
