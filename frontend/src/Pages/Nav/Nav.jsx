import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInThunk } from "../../store/user-slice";
import classes from "./Nav.module.css";
import { useAuth } from "../../context/AuthContext";

export default function Nav() {
  const { logout, authData } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
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
          {authData === null && <Link to="login">Login</Link>}
          {authData && authData.isAuthenticated && (
            <>
              <Link to={`recipes/${authData.user.username}`}>My Recipes</Link>
              <button onClick={handleLogout}>Log out</button>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
