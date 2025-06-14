import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedInThunk } from "../store/user-slice";
export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(setLoggedInThunk(true));
    }
  }, []);

  return (
    <>
      <Nav></Nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>Velislav Shopov. All rights reserved.</footer>
    </>
  );
}
