import { useLoaderData } from "react-router-dom";
import AllRecipesAside from "../components/AllRecipes/AllRecipesAside";
import AllRecipesSection from "../components/AllRecipes/AllRecipesSection";
import { fetchRecipes } from "../http requests/recipes";
import { useState } from "react";

export default function AllRecipes() {
  const loaderData = useLoaderData();
  const [recipes, setRecipes] = useState(loaderData.results);
  const [filters, setFilters] = useState({});

  async function handleRecipesFilter(filter) {
    const filterKey = Object.keys(filter)[0];
    const filterValue = filter[filterKey];

    let updatedFilters = { ...filters };
    console.log(updatedFilters);
    if (filterKey in updatedFilters) {
      let currentValues = updatedFilters[filterKey];
      if (currentValues.includes(filterValue)) {
        const filteredArray = currentValues.filter((v) => v !== filterValue);
        console.log(filteredArray);
        if (filteredArray.length > 0) {
          updatedFilters[filterKey] = filteredArray;
        } else {
          delete updatedFilters[filterKey];
        }
      } else {
        currentValues = [...currentValues, filterValue];
        updatedFilters[filterKey] = currentValues;
      }

      console.log(updatedFilters);
    } else {
      // Add the new filter value as an array
      updatedFilters[filterKey] = [filterValue];
    }

    console.log("Updated Filters:", updatedFilters);

    const response = await fetchRecipes(updatedFilters);
    setRecipes(response.results);
    setFilters(updatedFilters);
  }

  console.log(recipes);
  return (
    <>
      <AllRecipesAside
        handleRecipesFilter={handleRecipesFilter}
      ></AllRecipesAside>
      <AllRecipesSection recipes={recipes}></AllRecipesSection>
    </>
  );
}

export async function AllRecipesLoader() {
  const recipes = await fetchRecipes();
  return recipes;
}
