import SmallRecipe from "../UI/SmallRecipe";
import classes from "./AllRecipesSection.module.css";
import { PageSelection } from "./PageSelection";

export default function AllRecipesSection({ recipes, handlePageChange }) {
  const results = recipes.results;

  if (recipes.count === 0) {
    return (
      <section>
        <h2>No matches found</h2>
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <div className={classes.recipes_container}>
        {results.map((recipe) => (
          <SmallRecipe key={recipe.name} recipe={recipe}></SmallRecipe>
        ))}
      </div>

      <PageSelection
        recipes={recipes}
        handlePageChange={handlePageChange}
      ></PageSelection>
    </section>
  );
}
