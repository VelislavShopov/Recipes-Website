import AllRecipesAside from "../components/AllRecipes/AllRecipesAside";
import AllRecipesSection from "../components/AllRecipes/AllRecipesSection";
import { setInitialRecipes } from "../store/recipes-slice";
import { store } from "../store/store";

export default function AllRecipes() {
  return (
    <>
      <AllRecipesAside></AllRecipesAside>
      <AllRecipesSection></AllRecipesSection>
    </>
  );
}

export function AllRecipesLoader() {
  store.dispatch(setInitialRecipes());
}
