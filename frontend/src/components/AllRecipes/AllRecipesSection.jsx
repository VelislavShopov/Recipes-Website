import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { PageSelection } from "./PageSelection";

export default function AllRecipesSection({ recipes, handlePageChange }) {
  const results = recipes.results;
  const count = recipes.count;

  if (recipes.count === 0) {
    return (
      <section>
        <h2>No matches found</h2>
      </section>
    );
  }

  return (
    <section>
      <p>
        {count} match{count > 1 && "es"}
      </p>
      {results.map((recipe) => {
        return (
          <div key={recipe.id}>
            <img src={recipe.image} style={{ maxHeight: "5rem" }}></img>
            <h2>{recipe.name}</h2>
            <div>
              <ol>
                {recipe.ingredients.map((i) => {
                  return <li key={i.name}>{i.name}</li>;
                })}
              </ol>
            </div>
          </div>
        );
      })}
      <PageSelection
        recipes={recipes}
        handlePageChange={handlePageChange}
      ></PageSelection>
    </section>
  );
}
