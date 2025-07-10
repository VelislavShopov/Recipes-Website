import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CountryFlag from "./CountryFlag";

export default function ProfileDetails() {
  const params = useParams();
  const loaderData = useLoaderData();
  const { authData } = useAuth();
  const [profileData, setProfileData] = useState(loaderData);

  const auth = params.username === authData.user.username;

  return (
    <div>
      <h1>Profile Details</h1>
      <div>
        <img
          src={profileData.profile.picture}
          style={{ maxHeight: "8rem" }}
        ></img>
        <div>
          <p>
            {profileData.user.first_name} {profileData.user.last_name}
            <CountryFlag code={profileData.profile.country}></CountryFlag>
          </p>
          <p>Username: {profileData.user.username}</p>
        </div>
      </div>
    </div>
  );
}
