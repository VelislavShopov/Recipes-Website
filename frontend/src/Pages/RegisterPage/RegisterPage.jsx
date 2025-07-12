import {
  Link,
  Navigate,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import registerUser, { fetchUserData } from "../../http requests/accounts";
import { useAuth } from "../../context/AuthContext";
import obtainToken from "../../http requests/token";
import classes from "./RegisterPage.module.css";

export default function RegisterPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const { login } = useAuth();

  if (actionData !== undefined && actionData.isComplete) {
    login(actionData.user, actionData.token);
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Register</h1>
      <Form method="post" className={classes.form}>
        <div className={classes.names_container}>
          <div class={classes.inputbox}>
            <input name="first_name" required />
            <span>First Name</span>
            <i></i>
          </div>
          <div class={classes.inputbox}>
            <input name="last_name" required />
            <span>Last Name</span>
            <i></i>
          </div>
        </div>
        <div class={classes.inputbox}>
          <input name="username" required />
          <span>Username</span>
          <i></i>
        </div>
        <div class={classes.inputbox}>
          <input name="email" required />
          <span>Email</span>
          <i></i>
        </div>
        <div class={classes.inputbox}>
          <input name="password1" type="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <div class={classes.inputbox}>
          <input name="password2" type="password" required />
          <span>Confirm Password</span>
          <i></i>
        </div>
        {actionData && actionData.error && actionData.error.password2 && (
          <p>{actionData.error.password2}</p>
        )}

        <div className={classes.loginbutton_container}>
          <Link to="/login/" className={classes.register_link}>
            Login?
          </Link>
          <button class={classes.button}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              ></path>
            </svg>

            <div class={classes.text}>Register</div>
          </button>
        </div>
        {navigation.state === "submitting" && <p>Logging in.....</p>}
      </Form>
    </div>
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
