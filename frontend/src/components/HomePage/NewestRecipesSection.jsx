import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

export default function NewestRecipesSection() {
  const recipes = useLoaderData();
  return (
    <>
      <section>
        <h1>New Recipes</h1>
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <h3>{recipe.name}</h3>
            </div>
          );
        })}
      </section>
    </>
  );
}
