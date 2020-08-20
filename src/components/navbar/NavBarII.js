import React from "react";
import { Link } from "react-router-dom";

const navbarII = () => {
  return (
    <nav className="nav-style">
      <ul>
        <li>
          <Link to="/tasks" style={{ textDecoration: "none" }}>
            Tasks
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbarII;
