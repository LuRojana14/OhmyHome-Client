import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider"; //	<-- UPDATE HERE

class Botones extends Component {
  render() {
    const { logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        {isLoggedin ? (
          <>
            {/* <p className="navbar-user">username: {user.username}</p>{" "} */}
            {/* 	<-- UPDATE HERE     */}
            <button className="navbar-button" onClick={logout}>
              Logout
            </button>{" "}
            <button>
              <Link to="/tasks" style={{ textDecoration: "none" }}>
                Tasks
              </Link>
            </button>
            <button>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                Profile
              </Link>
            </button>
            {/* 	<-- UPDATE HERE     */}
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="navbar-button">Sign up</button>
            </Link>
            <Link to="/login">
              <button className="navbar-button">Login</button>
            </Link>
            <br />
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Botones); //	<-- UPDATE HERE
