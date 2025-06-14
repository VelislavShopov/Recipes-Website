import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MyRecipes from "./Pages/MyRecipes";
import AddRecipe from "./Pages/AddRecipe";

import { homeLoader } from "./Pages/Home";
import { loginAction } from "./Pages/Login";
import { registerAction } from "./Pages/Register";
import { myRecipesLoader } from "./Pages/MyRecipes";
import { addRecipeLoader } from "./Pages/AddRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: homeLoader,
      },
      {
        path: "login/",
        element: <Login></Login>,
        action: loginAction,
      },
      {
        path: "register/",
        element: <Register></Register>,
        action: registerAction,
      },
      {
        path: "recipes/:username",
        element: <MyRecipes></MyRecipes>,
        loader: myRecipesLoader,
      },
      {
        path: "recipes/add",
        element: <AddRecipe></AddRecipe>,
        loader: addRecipeLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
