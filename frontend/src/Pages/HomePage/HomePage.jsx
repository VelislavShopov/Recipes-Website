import { fetchNewestRecipes } from "../../http requests/recipes";

import NewestRecipesSection from "../../components/HomePage/NewestRecipesSection";
import BestRecipesSection from "../../components/HomePage/BestRecipesSection";

export default function HomePage() {
  return (
    <>
      <BestRecipesSection></BestRecipesSection>
      <NewestRecipesSection></NewestRecipesSection>
    </>
  );
}

export async function homeLoader({ request }) {
  const data = await fetchNewestRecipes();

  return data;
}
