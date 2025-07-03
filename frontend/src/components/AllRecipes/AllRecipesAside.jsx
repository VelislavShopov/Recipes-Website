export default function AllRecipesAside({ handleRecipesFilter }) {
  return (
    <aside>
      <div>
        <ul>
          <li>
            <input
              type="checkbox"
              onChange={() => handleRecipesFilter({ type_dish: "salad" })}
            />
            <label>Salads</label>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={() => handleRecipesFilter({ type_dish: "main" })}
            />
            <label>Mains</label>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={() => handleRecipesFilter({ type_dish: "dessert" })}
            />
            <label>Desserts</label>
          </li>
        </ul>
      </div>
    </aside>
  );
}
