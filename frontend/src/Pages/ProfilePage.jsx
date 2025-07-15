import { Link, useParams } from "react-router-dom";
import { fetchRecipesByUser } from "../http requests/recipes";
import RecipesList from "../components/ProfilePage/RecipesList";
import { useAuth } from "../context/AuthContext";
import {
  fetchProfileByUser,
  fetchUserData,
  fetchUserDataByUsername,
} from "../http requests/accounts";
import ProfileDetails from "../components/ProfilePage/ProfileDetails";

export default function ProfilePage() {
  return (
    <>
      <ProfileDetails></ProfileDetails>

      <RecipesList></RecipesList>
    </>
  );
}

export async function profileLoader({ request, params }) {
  try {
    const recipes = await fetchRecipesByUser(params.username);
    const profile = await fetchProfileByUser(params.username);
    const user = await fetchUserDataByUsername(params.username);
    console.log(profile);
    return {
      recipes,
      profile,
      user,
    };
  } catch (err) {
    return err;
  }
}
