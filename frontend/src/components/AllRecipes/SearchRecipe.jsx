import { useState } from "react";
import classes from "./SearchRecipe.module.css";

export default function SearchRecipe({ handleSearchRecipes }) {
  const [searchValue, setSearchValue] = useState("");

  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  function handleClick() {
    handleSearchRecipes(searchValue);
    setSearchValue("");
  }

  return (
    <div className={classes.form}>
      <button onClick={handleClick}>
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            stroke-width="1.333"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      <input
        className={classes.input}
        placeholder="Type the name of the recipe"
        value={searchValue}
        onChange={(event) => handleChange(event)}
      />
      <button className={classes.reset} onClick={() => setSearchValue("")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
}
