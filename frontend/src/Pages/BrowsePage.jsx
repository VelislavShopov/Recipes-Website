import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import AllRecipesAside from "../components/AllRecipes/AllRecipesAside";
import AllRecipesSection from "../components/AllRecipes/AllRecipesSection";
import { fetchRecipes } from "../http requests/recipes";
import { useState } from "react";

export default function BrowsePage() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState(loaderData.recipes);
  const [filters, setFilters] = useState(loaderData.filters);

  async function handleClearFilter() {
    setFilters({});
    setSearchParams({});
    const response = await fetchRecipes();
    setRecipes(response);
  }

  async function handleRecipesFilter(filter) {
    searchParams.delete("page");
    const filterKey = Object.keys(filter)[0];
    const filterValue = filter[filterKey];

    let updatedFilters = { ...filters };

    if (filterKey in updatedFilters) {
      let currentValues = updatedFilters[filterKey];

      // Ensure currentValues is always an array
      if (!Array.isArray(currentValues)) {
        currentValues = [currentValues];
      }

      if (currentValues.includes(filterValue)) {
        const filteredArray = currentValues.filter((v) => v !== filterValue);
        if (filteredArray.length > 0) {
          updatedFilters[filterKey] = filteredArray;
        } else {
          delete updatedFilters[filterKey];
        }
      } else {
        updatedFilters[filterKey] = [...currentValues, filterValue];
      }
    } else {
      updatedFilters[filterKey] = [filterValue];
    }

    const newSearchParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, valueArray]) => {
      valueArray.forEach((v) => newSearchParams.append(key, v));
    });

    setSearchParams(newSearchParams);

    const response = await fetchRecipes(newSearchParams);
    setRecipes(response);
    setFilters(updatedFilters);
  }

  async function handlePageChange(page) {
    searchParams.set("page", page);
    const response = await fetchRecipes(searchParams);
    setRecipes(response);
    setSearchParams(searchParams);
  }

  return (
    <>
      <AllRecipesAside
        filters={filters}
        handleRecipesFilter={handleRecipesFilter}
        handleClearFilter={handleClearFilter}
      ></AllRecipesAside>
      <AllRecipesSection
        recipes={recipes}
        handlePageChange={handlePageChange}
      ></AllRecipesSection>
    </>
  );
}

export async function browseLoader({ request }) {
  const url = new URL(request.url);

  const filters = {};
  url.searchParams.forEach((value, key) => {
    if (filters[key]) {
      filters[key].push(value);
    } else {
      filters[key] = [value];
    }
  });

  console.log("Filters from loader:", filters);

  const apiParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, valueArray]) => {
    valueArray.forEach((v) => apiParams.append(key, v));
  });

  const recipes = await fetchRecipes(apiParams);

  return { recipes, filters };
}
