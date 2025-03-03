import React, { useContext } from "react";
// import { assets } from "../assets/assets";
import { EmpContext } from "../../context/EmpContext";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { eToken, setEToken } = useContext(EmpContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    eToken && setEToken("");
    eToken && localStorage.removeItem("eToken");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="nav-main">
      <div>
        {/* <img
          onClick={() => navigate("/")}
          //   src={assets.admin_logo}
          alt=""
        /> */}
        <p>
          <h1>Welcome back {aToken ? "Admin" : "Emp"}</h1>
        </p>
      </div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
