import { Link, useNavigate } from "react-router-dom";
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
        <div className={classes.title_div}>
          <Link to="">Chef's List</Link>
        </div>
        <div className={classes.links_div}>
          <Link to="">Home</Link>
          <Link to="recipes">Browse</Link>
          {authData === null && <Link to="login">Login</Link>}
          {authData && authData.isAuthenticated && (
            <>
              <Link to={`users/${authData.user.username}/`}>Profile</Link>
              <button onClick={handleLogout}>Log out</button>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
