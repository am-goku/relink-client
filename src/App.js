import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

//pages
import NavBar from "./components/layout/NavBar";
import Header from "./components/layout/Header";
import NavBarSm from "./components/layout/NavBar-Sm";

function App() {
  const location = useLocation();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(location.pathname);
  }, [location, path]);

  return (
    <>
      <div className="md:hidden pb-10">
        <Header />
      </div>
      <div className="flex">
        <div className="hidden md:block">
          <NavBar path={path} />
        </div>
        <Outlet />
      </div>
      <div className="md:hidden mt-14">
        <NavBarSm />
      </div>
    </>
  );
}

export default App;
