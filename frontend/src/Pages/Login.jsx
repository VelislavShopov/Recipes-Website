import {
  Link,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Form } from "react-router-dom";
import obtainToken from "../http requests/token";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { fetchUserData } from "../http requests/token";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const actionData = useActionData();
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState(null);
  const [redirectPath, setRedirectPath] = useState(
    location.state?.from?.pathname || "/"
  );
  const [loginProcessed, setLogInProcessed] = useState(false);

  console.log(actionData);

  useEffect(() => {
    if (navigation.state === "submitting") {
      setErrors(null);
      return;
    }
    if (actionData && !loginProcessed) {
      if (actionData.error) {
        setErrors(actionData.error);
      } else if (actionData.token && actionData.userData) {
        login(actionData.userData, actionData.token);
        setLogInProcessed(true);
        console.log(redirectPath);
        navigate(redirectPath, { replace: true });
      }
    }
  }, [actionData, login, navigate, navigation.state, location, loginProcessed]);

  return (
    <>
      <h1>Login</h1>
      <Form method="post">
        {errors && <p>{errors}</p>}
        <div>
          <label>Username: </label>
          <input name="username" />
        </div>
        <div>
          <label>Password: </label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </Form>
      {navigation.state !== "idle" && <p>Logging in.....</p>}
      <Link to="/register/">Register?</Link>
    </>
  );
}

export async function loginAction({ request }) {
  const formData = await request.formData();
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  console.log(user);

  if (user.username === "" || user.password === "") {
    return { error: "Please fill all fields" };
  }

  try {
    const token = await obtainToken(user);
    const userData = await fetchUserData(token);
    return {
      token,
      userData: userData.data,
    };
  } catch (error) {
    return { error: "Incorrect username or password" };
  }
}
