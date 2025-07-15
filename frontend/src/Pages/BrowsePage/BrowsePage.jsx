import { useLoaderData, useSearchParams } from "react-router-dom";
import AllRecipesAside from "../../components/AllRecipes/AllRecipesAside";
import AllRecipesSection from "../../components/AllRecipes/AllRecipesSection";
import {
  fetchLongestCookingTime,
  fetchRecipes,
} from "../../http requests/recipes";
import { useState, useEffect, useRef } from "react";
import SearchRecipe from "../../components/AllRecipes/SearchRecipe";
import classes from "./BrowsePage.module.css";

export default function BrowsePage() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState(loaderData.recipes);
  const [filters, setFilters] = useState(loaderData.filters);
  const [page, setPage] = useState(searchParams.get("page"));

  const sliderRef = useRef();

  const handleChangeChildValue = () => {
    if (sliderRef.current) {
      sliderRef.current.resetRange();
    }
  };

  async function handleClearFilter() {
    setFilters({});
    setSearchParams({});
    handleChangeChildValue();
    const response = await fetchRecipes();
    setRecipes(response);
  }

  async function handleRecipesFilter(filter) {
    const filterKey = Object.keys(filter)[0];
    console.log(filterKey);

    const q = searchParams.get("q");
    let updatedFilters = { ...filters };
    let rangeFilters = {};

    if (q !== null) {
      updatedFilters["q"] = [q];
    }
    if (filterKey === "range") {
      console.log(filter.range);
      rangeFilters["min_range"] = filter.range.min;
      rangeFilters["max_range"] = filter.range.max;
    } else {
      const filterValue = filter[filterKey];

      if (filterKey in updatedFilters) {
        let currentValues = updatedFilters[filterKey];

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
    }
    console.log(updatedFilters);
    console.log(rangeFilters);
    const newSearchParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, valueArray]) => {
      valueArray.forEach((v) => newSearchParams.append(key, v));
    });

    if (rangeFilters.max_range) {
      try {
        newSearchParams.delete("min_range");
      } finally {
        newSearchParams.append("min_range", rangeFilters.min_range);
      }

      try {
        newSearchParams.delete("max_range");
      } finally {
        newSearchParams.append("max_range", rangeFilters.max_range);
      }
    }

    console.log(newSearchParams);

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
    setPage(page);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  async function handleSearchRecipes(value) {
    searchParams.set("q", value);
    searchParams.set("page", 1);
    const response = await fetchRecipes(searchParams);
    setRecipes(response);
    setSearchParams(searchParams);
    setPage(1);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Browse Recipes</h1>
      <div className={classes.container_grid}>
        <AllRecipesAside
          sliderRef={sliderRef}
          count={recipes.count}
          filters={filters}
          handleRecipesFilter={handleRecipesFilter}
          handleClearFilter={handleClearFilter}
        ></AllRecipesAside>
        <SearchRecipe handleSearchRecipes={handleSearchRecipes}></SearchRecipe>
        <AllRecipesSection
          recipes={recipes}
          handlePageChange={handlePageChange}
        ></AllRecipesSection>
      </div>
    </div>
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

  const apiParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, valueArray]) => {
    valueArray.forEach((v) => apiParams.append(key, v));
  });

  const recipes = await fetchRecipes(apiParams);
  const longestCookingTime = await fetchLongestCookingTime();

  return { recipes, filters, longestCookingTime };
}
