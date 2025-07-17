import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import classes from "./RecipeDetailSection.module.css";
import RatingsSection from "./RatingsSection";
import { useAuth } from "../../context/AuthContext";
import EditButton from "../UI/EditButton";
import SubmitButton from "../UI/SubmitButton";
import {
  AddIngredientToRecipe,
  deleteIngredientForRecipe,
  patchRecipe,
} from "../../http requests/recipes";
import AddIngredient from "./AddIngredient";
import SmallDeleteButton from "../UI/SmallDeleteButton";
import UploadImage from "../UI/UploadImage";

export default function RecipeDetailSection() {
  const loaderData = useLoaderData();
  const [recipe, setRecipe] = useState(loaderData);

  const { authData } = useAuth();

  const [isUserOwned, setIsUserOwned] = useState(
    authData !== null && recipe.user.id === authData.user.id
  );

  const [changedValues, setChangedValues] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  async function handleSubmit() {
    const response = await patchRecipe(recipe.id, changedValues);
    setChangedValues(null);
    setIsEditing(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setRecipe(response);
  }

  function handleChange(e, type) {
    let value = e;

    if (type !== "image") {
      value = value.target.value;
    }

    setChangedValues((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });

    if (type !== "image") {
      setRecipe((prev) => {
        return {
          ...prev,
          [type]: e.target.value,
        };
      });
    }
  }

  async function handleIngredientDeletion(itemId) {
    const response = await deleteIngredientForRecipe(itemId, recipe.id);
    setRecipe((prev) => {
      return {
        ...prev,
        ingredients: prev.ingredients.filter((item) => item.id !== itemId),
      };
    });
  }

  async function handleAddIngredient(ingredient) {
    const response = await AddIngredientToRecipe(ingredient.id, recipe.id);
    setRecipe((prev) => {
      return {
        ...prev,
        ingredients: [...prev.ingredients, ingredient],
      };
    });
  }

  console.log(changedValues);

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
        {!isEditing && (
          <img src={recipe.image} className={classes.recipe_img} />
        )}
        {isEditing && <UploadImage handleChange={handleChange}></UploadImage>}

        <hr></hr>
        <div className={classes.ingredients_container}>
          <h2 className={classes.h2}>Ingredients:</h2>
          <ol>
            {recipe.ingredients.map((item, index) => {
              return (
                <li key={index + 1}>
                  <p>
                    {index + 1}.{item.name}
                  </p>
                  {isEditing && (
                    <SmallDeleteButton
                      onClick={() => handleIngredientDeletion(item.id)}
                    ></SmallDeleteButton>
                  )}
                </li>
              );
            })}
            {isEditing && (
              <li>
                <AddIngredient
                  ingredients={recipe.ingredients}
                  handleAddIngredient={handleAddIngredient}
                ></AddIngredient>
              </li>
            )}
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
        {isEditing && (
          <SubmitButton onClick={() => handleSubmit()}></SubmitButton>
        )}
      </section>
      <hr></hr>
      <RatingsSection recipe={recipe} setRecipe={setRecipe}></RatingsSection>
    </>
  );
}
