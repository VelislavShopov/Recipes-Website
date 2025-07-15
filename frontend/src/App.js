import { createBrowserRouter, useLocation } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout/Layout.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.jsx";
import ProfilePage from "./Pages/ProfilePage";
import AddRecipePage from "./Pages/AddRecipePage";

import { homeLoader } from "./Pages/HomePage/HomePage.jsx";
import { loginAction } from "./Pages/LoginPage/LoginPage.jsx";
import { registerAction } from "./Pages/RegisterPage/RegisterPage.jsx";
import { profileLoader } from "./Pages/ProfilePage";
import { addRecipeLoader } from "./Pages/AddRecipePage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Authorization/ProtectedRoute";
import BrowsePage, { browseLoader } from "./Pages/BrowsePage/BrowsePage.jsx";
import { addRecipeAction } from "./components/AddRecipe/AddRecipeSection";
import RecipeDetailPage, { recipeDetailLoader } from "./Pages/RecipeDetailPage";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
        loader: homeLoader,
      },
      {
        path: "login/",
        element: <LoginPage></LoginPage>,
        action: loginAction,
      },
      {
        path: "register/",
        element: <RegisterPage></RegisterPage>,
        action: registerAction,
      },
      {
        path: "recipes/",
        children: [
          {
            index: true,
            element: <BrowsePage></BrowsePage>,
            loader: browseLoader,
          },
          {
            path: ":slug/",
            element: <RecipeDetailPage></RecipeDetailPage>,
            loader: recipeDetailLoader,
          },
        ],
      },
      {
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          {
            path: "recipes/add/",
            element: <AddRecipePage></AddRecipePage>,
            loader: addRecipeLoader,
            action: addRecipeAction,
          },
          {
            path: "users/:username/",
            element: <ProfilePage></ProfilePage>,
            loader: profileLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
