import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function RecipeDetailSection() {
  const loaderData = useLoaderData();
  const [recipe, setRecipe] = useState(loaderData);

  return (
    <section>
      <h2>{recipe.name}</h2>
      <img src={recipe.image} style={{ maxHeight: "10rem" }} />
      <div>
        <ul>
          {recipe.ingredients.map((item) => {
            return <li>{item.name}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
