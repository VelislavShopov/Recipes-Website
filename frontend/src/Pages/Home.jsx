import { newestRecipes } from "../http requests/recipes";
import { store } from "../store/store";

import NewestRecipesSection from "../components/HomePage/NewestRecipesSection";
import BestRecipesSection from "../components/HomePage/BestRecipesSection";

export default function Home() {
  return (
    <>
      <BestRecipesSection></BestRecipesSection>
      <NewestRecipesSection></NewestRecipesSection>
    </>
  );
}

export async function homeLoader({ request }) {
  const data = await newestRecipes();
  console.log(data);

  return data;
}
