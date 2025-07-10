import { useState } from "react";

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
    <div>
      <input
        value={searchValue}
        onChange={(event) => handleChange(event)}
      ></input>
      <button onClick={handleClick}>Search</button>
    </div>
  );
}
