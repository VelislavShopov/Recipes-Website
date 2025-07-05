import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

export default function AllRecipesSection({ recipes, handleResetFilters }) {
  if (recipes.length === 0) {
    return (
      <section>
        <h2>No matches found</h2>
      </section>
    );
  }

  return (
    <section>
      <p>
        {recipes.length} match{recipes.length > 1 && "es"}
      </p>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.id}>
            <img src={recipe.image} style={{ maxHeight: "5rem" }}></img>
            <h2>{recipe.name}</h2>
            <div>
              <ol>
                {recipe.ingredients.map((i) => {
                  return <li>{i.name}</li>;
                })}
              </ol>
            </div>
          </div>
        );
      })}
    </section>
  );
}
