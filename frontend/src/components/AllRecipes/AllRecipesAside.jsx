import { TYPE_DISH } from "../../utils/dish_info";

export default function AllRecipesAside({
  filters,
  handleRecipesFilter,
  handleClearFilter,
}) {
  console.log(filters);
  return (
    <aside>
      <div>
        <button onClick={handleClearFilter}>Clear Filters</button>
        <ul>
          {TYPE_DISH.map((item) => {
            const dish =
              String(item).charAt(0).toUpperCase() + String(item).slice(1);
            const checked =
              filters.type_dish !== undefined &&
              filters.type_dish.includes(item);
            return (
              <li>
                <input
                  checked={checked}
                  type="checkbox"
                  onChange={() => handleRecipesFilter({ type_dish: item })}
                />
                <label>{dish}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
