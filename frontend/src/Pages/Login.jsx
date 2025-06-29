import {
  Link,
  Navigate,
  redirect,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Form } from "react-router-dom";
import obtainToken from "../http requests/token";
import { store } from "../store/store";
import { setLoggedInThunk } from "../store/user-slice";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const actionData = useActionData();
  if (actionData) {
    login(actionData.username, actionData.password);
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      <h1>Login</h1>
      <Form method="post">
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

  return user;
}
