import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeTokenOnLS } from "../../services/localStorage";
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const logout = async () => {
    await removeTokenOnLS();
    navigate("/login");
  };

  return (
    <nav className="navbar_nav">
      <ul>
        <NavLink to="/">Home</NavLink>

        {token ? (
          <>
            <NavLink to="/create">Create</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button id="logoutButton" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        {/* <NavLink to="/counter">Counter</NavLink> */}

        <input
          className="searchInput"
          type="search"
          placeholder="Search Here..."
        />
      </ul>
    </nav>
  );
};

export default Navbar;
