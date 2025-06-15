import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInThunk } from "../../store/user-slice";
import classes from "./Nav.module.css";
import { useAuth } from "../../context/AuthContext";

export default function Nav() {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    dispatch(setLoggedInThunk(false));
    navigate("/");
  }

  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        <h1>
          <Link to="">Chef's List</Link>
        </h1>
        <div className={classes.links_div}>
          <Link to="">Home</Link>
          <Link to="recipes">Recipes</Link>
          {!isLoggedIn && <Link to="login">Login</Link>}
          {isLoggedIn && (
            <>
              <Link to={`recipes/${localStorage.getItem("username")}`}>
                My Recipes
              </Link>
              <button onClick={handleLogout}>Log out</button>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
