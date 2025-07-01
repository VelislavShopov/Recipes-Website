import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

export default function AllRecipesSection({ recipes }) {
  return (
    <section>
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
