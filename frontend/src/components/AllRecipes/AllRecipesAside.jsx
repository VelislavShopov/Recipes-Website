import { useDispatch } from "react-redux";
import { addFilterRecipes } from "../../store/recipes-slice";

export default function AllRecipesAside() {
  const dispatch = useDispatch();

  return (
    <aside>
      <div>
        <ul>
          <li>
            <input
              type="checkbox"
              onChange={() => dispatch(addFilterRecipes("type_dish", "salad"))}
            />
            <label>Salads</label>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={() => dispatch(addFilterRecipes("type_dish", "main"))}
            />
            <label>Mains</label>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={() =>
                dispatch(addFilterRecipes("type_dish", "dessert"))
              }
            />
            <label>Desserts</label>
          </li>
        </ul>
      </div>
    </aside>
  );
}
