import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Nav/Nav.jsx";
import Footer from "../Footer/Footer.jsx";
import classes from "./Layout.module.css";
import { useEffect } from "react";
export default function Layout() {
  const location = useLocation();
  window.scrollTo({
    top: 0,
  });

  useEffect(() => {
    localStorage.setItem("lastVisitedPath", location.pathname);
  }, [location]);

  return (
    <>
      <Nav></Nav>
      <main className={classes.main}>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}
