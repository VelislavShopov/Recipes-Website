import { Link, redirect, useFetcher } from "react-router-dom";
import { Form } from "react-router-dom";
import sendRegisterData from "../http requests/register";
import { store } from "../store/store";
import { setLoggedInThunk } from "../store/user-slice";
export default function Register() {
  const fetcher = useFetcher();

  return (
    <>
      <h1>Register</h1>
      <fetcher.Form method="post">
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
      </fetcher.Form>
      {fetcher.state !== "idle" && <p>Logging in.....</p>}
      <Link to="/login/">Login?</Link>
    </>
  );
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  await sendRegisterData(formData);
  store.dispatch(setLoggedInThunk(true));
  return redirect("/");
}
