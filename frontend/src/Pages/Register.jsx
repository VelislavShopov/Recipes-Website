import {
  Link,
  Navigate,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import registerUser from "../http requests/register";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const { login } = useAuth();

  if (actionData !== undefined && actionData.isComplete) {
    login(actionData.user.username, actionData.user.password);
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
          <label>Password: </label>
          <input name="password" type="password"></input>
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
  const response = await registerUser(formData);
  console.log(response);
  return {
    isComplete: response.isComplete,
    user: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
  };
}
