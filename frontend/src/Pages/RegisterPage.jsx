import {
  Link,
  Navigate,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import registerUser, { fetchUserData } from "../http requests/accounts";
import { useAuth } from "../context/AuthContext";
import obtainToken from "../http requests/token";

export default function RegisterPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const { login } = useAuth();

  if (actionData !== undefined && actionData.isComplete) {
    login(actionData.user, actionData.token);
    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <h1>Register</h1>
      <Form method="post">
        <div>
          <label>First Name:</label>
          <input name="first_name" required></input>
        </div>
        <div>
          <label>Last Name:</label>
          <input name="last_name" required></input>
        </div>
        <div>
          <label>Username:</label>
          <input name="username" required></input>
        </div>
        <div>
          <label>Email:</label>
          <input name="email" type="email" required></input>
        </div>
        <div>
          <label>Password: </label>
          <input name="password1" type="password" required></input>
        </div>
        <div>
          <label>Password Confirmation: </label>
          {actionData && actionData.error && actionData.error.password2 && (
            <p>{actionData.error.password2}</p>
          )}
          <input name="password2" type="password" required></input>
        </div>
        <button type="submit">Register</button>
      </Form>
      {navigation.state === "submitting" && <p>Logging in.....</p>}
      <Link to="/login/">Login?</Link>
    </>
  );
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  console.log(formData.get("password1"));
  console.log(formData.get("password2"));

  if (formData.get("password1") !== formData.get("password2")) {
    return {
      error: {
        password2: "Passwords don't match!",
      },
    };
  }

  const response = await registerUser(formData);
  const token = await obtainToken({
    username: formData.get("username"),
    password: formData.get("password1"),
  });
  const user = await fetchUserData(token);

  return {
    isComplete: response.isComplete,
    user: user.data,
    token,
  };
}
