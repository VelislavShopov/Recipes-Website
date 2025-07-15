import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { createRecipe } from "../../http requests/recipes";
import { TYPE_DISH } from "../../utils/dish_info";

export default function AddRecipeSection() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const initialIngredients = loaderData.ingredients.results;
  const [availableIngredients, setavailableIngredients] =
    useState(initialIngredients);
  const [chosenIngredients, setChosenIngredients] = useState([]);
  const [errors, setErrors] = useState(null);
  console.log(errors);
  useEffect(() => {
    if (navigation.state === "submitting") {
      setErrors(null);
    }

    if (actionData && actionData.error) {
      setErrors(actionData.error.data);
    }

    if (actionData && actionData.success) {
      console.log("asd");
      navigate("/");
    }
  }, [actionData, navigate, setErrors]);

  function selectIngredient(item) {
    setavailableIngredients((prev) => prev.filter((i) => i !== item));
    setChosenIngredients((prev) => [...prev, item]);
  }

  function deselectIngredient(item) {
    setChosenIngredients((prev) => prev.filter((i) => i !== item));
    setavailableIngredients((prev) => [...prev, item]);
  }

  return (
    <>
      <Form encType="multipart/form-data" method="post">
        <div>
          <label>Name:</label>
          {errors && errors.name && <p>Please provide a name</p>}
          <input name="name"></input>
        </div>
        <div>
          <label>Type:</label>
          <select name="type_dish">
            {TYPE_DISH.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Available ingredients:</label>
          {availableIngredients.map((item) => {
            return (
              <button key={item.name} onClick={() => selectIngredient(item)}>
                {" "}
                {item.name}
              </button>
            );
          })}
          <label>Chosen ingredients:</label>
          {chosenIngredients.map((item) => {
            return (
              <button key={item.name} onClick={() => deselectIngredient(item)}>
                {item.name}
              </button>
            );
          })}
          <input
            style={{ display: "none" }}
            value={JSON.stringify(chosenIngredients)}
            name="ingredients"
            readOnly
          ></input>
        </div>
        <div>
          <label>Image:</label>
          {errors && errors.image && <p>No image provided</p>}
          <input type="file" name="image"></input>
        </div>
        <div>
          <label>Description:</label>
          {errors && errors.description && <p>Please provide a description</p>}
          <textarea name="description" type=""></textarea>
        </div>
        <button>Create</button>
      </Form>
    </>
  );
}

export async function addRecipeAction({ request }) {
  const formData = await request.formData();
  const recipe = {
    name: formData.get("name"),
    type_dish: formData.get("type_dish"),
    ingredients: formData.get("ingredients"),
    image: formData.get("image"),
    description: formData.get("description"),
  };
  console.log(recipe);
  try {
    const response = await createRecipe(recipe);
    return { success: true };
  } catch (err) {
    return { error: err.response };
  }
}
