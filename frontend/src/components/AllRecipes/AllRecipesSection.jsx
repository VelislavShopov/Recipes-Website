import { useSelector } from "react-redux";

export default function AllRecipesSection() {
  const recipes = useSelector((store) => store.recipes.filteredRecipes);
  console.log(recipes);
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
