import {
  Link,
  redirect,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Form } from "react-router-dom";
import obtainToken from "../http requests/token";
import { store } from "../store/store";
import { setLoggedInThunk } from "../store/user-slice";

export default function Login() {
  const fetcher = useFetcher();

  return (
    <>
      <h1>Login</h1>
      <fetcher.Form method="post">
        <div>
          <label>Username: </label>
          <input name="username" />
        </div>
        <div>
          <label>Password: </label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </fetcher.Form>
      {fetcher.state !== "idle" && <p>Logging in.....</p>}
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

  const token = await obtainToken(user);
  localStorage.setItem("token", token.data.token);
  localStorage.setItem("username", user.username);
  store.dispatch(setLoggedInThunk(true, user.username));

  return redirect("/");
}
