import {
  Link,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Form } from "react-router-dom";
import obtainToken from "../../http requests/token";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../http requests/accounts";
import classes from "./LoginPage.module.css";

export default function LoginPage() {
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
        navigate(redirectPath, { replace: true });
      }
    }
  }, [actionData, login, navigate, navigation.state, location, loginProcessed]);

  let formClasses = classes.form;
  if (navigation.state === "submitting" || errors !== null) {
    formClasses = `${classes.form} ${classes.bigger_form}`;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Login</h1>
      <Form method="post" className={formClasses}>
        {navigation.state === "submitting" && (
          <p className={classes.p}>Logging in.....</p>
        )}
        {errors && <p className={classes.p}>{errors}</p>}
        <div className={classes.wrapper}>
          <div className={classes.labelinput_container}>
            <div className={classes.group}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                className={classes.icon}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <input
                class={classes.input}
                placeholder="username or email"
                name="username"
              />
            </div>
          </div>
          <div className={classes.labelinput_container}>
            <div className={classes.group}>
              <svg
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class={classes.icon}
              >
                <path
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
              <input
                class={classes.input}
                type="password"
                placeholder="password"
                name="password"
              />
            </div>
          </div>
        </div>

        <div className={classes.loginbutton_container}>
          <Link to="/register/" className={classes.register_link}>
            Register?
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

            <div class={classes.text}>Login</div>
          </button>
        </div>
      </Form>
    </div>
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
