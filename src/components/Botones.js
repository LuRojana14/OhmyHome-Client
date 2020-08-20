import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider"; //	<-- UPDATE HERE

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        {isLoggedin ? (
          <>
            <p className="navbar-user">username: {user.username}</p>{" "}
            {/* 	<-- UPDATE HERE     */}
            <button className="navbar-button" onClick={logout}>
              Logout
            </button>{" "}
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

export default withAuth(Navbar); //	<-- UPDATE HERE
