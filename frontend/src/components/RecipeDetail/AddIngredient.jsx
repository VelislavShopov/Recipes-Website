import { useEffect, useState } from "react";
import Select from "react-select";
import { fetchIngredients } from "../../http requests/recipes";
import AddItemButton from "../UI/AddItemButton";
import classes from "./AddIngredient.module.css";

export default function AddIngredient({ ingredients, handleAddIngredient }) {
  const [isAdding, setIsAdding] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);

  useEffect(() => {
    async function func(ingredientsIds) {
      const responseData = await fetchIngredients();
      const newIngredients = responseData.filter(
        (item) => !ingredientsIds.includes(item.id)
      );

      const optionsNew = newIngredients.map((item) => {
        return {
          value: item,
          label: item.name,
        };
      });
      setOptions(optionsNew);
    }

    const ingredientsIds = ingredients.map((item) => item.id);

    func(ingredientsIds);
  }, [ingredients]);

  function handleClick() {
    handleAddIngredient(selectedOption.value);
    setSelectedOption(null);
    setIsAdding(false);
  }
  return (
    <>
      {!isAdding && (
        <AddItemButton onClick={() => setIsAdding(true)}></AddItemButton>
      )}
      {isAdding && (
        <>
          <Select
            isSearchable
            options={options}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e)}
          ></Select>
          <div className={classes.wrapper}>
            <button className={classes.btn} onClick={handleClick}></button>
            <svg></svg>
          </div>
        </>
      )}
    </>
  );
}
