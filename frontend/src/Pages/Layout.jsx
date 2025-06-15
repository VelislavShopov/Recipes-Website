import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedInThunk } from "../store/user-slice";
import { useAuth } from "../context/AuthContext";
export default function Layout() {
  const { loading } = useAuth();

  if (loading) {
    return <></>;
  }

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
