import { TYPE_DISH } from "../../utils/dish_info";

export default function AllRecipesAside({ handleRecipesFilter }) {
  return (
    <aside>
      <div>
        <ul>
          {TYPE_DISH.map((item) => {
            const dish =
              String(item).charAt(0).toUpperCase() + String(item).slice(1);

            return (
              <li>
                <input
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
