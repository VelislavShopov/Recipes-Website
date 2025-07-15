import { TYPE_DISH } from "../../utils/dish_info";
import { COOKING_TIME } from "../../utils/dish_info";
import RangeSlider from "../UI/RangeSlider";
import classes from "./AllRecipesAside.module.css";

export default function AllRecipesAside({
  count,
  filters,
  handleRecipesFilter,
  handleClearFilter,
  sliderRef,
}) {
  return (
    <aside className={classes.aside}>
      <div className={classes.h2_container}>
        <h2 className={classes.h2}>Filters</h2>
        <button onClick={handleClearFilter}>Clear</button>
      </div>
      <p>
        {count} match{count > 1 && "es"}
      </p>
      <hr></hr>
      <div className={classes.typedish_container}>
        <h3>Type Dish:</h3>
        <ul>
          {TYPE_DISH.map((item) => {
            const dish =
              String(item).charAt(0).toUpperCase() + String(item).slice(1);
            const checked =
              filters.type_dish !== undefined &&
              filters.type_dish.includes(item);
            return (
              <li>
                <div className={classes.checkbox_wrapper}>
                  <input
                    className={classes.ikxBAC}
                    id={item}
                    checked={checked}
                    type="checkbox"
                    onChange={() => handleRecipesFilter({ type_dish: item })}
                  />
                </div>
                <label htmlFor={item}>{dish}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <hr></hr>
      <div>
        <h3>Cooking Time:</h3>
        <RangeSlider
          handleRecipesFilter={handleRecipesFilter}
          ref={sliderRef}
        ></RangeSlider>
      </div>
      <hr></hr>
    </aside>
  );
}
