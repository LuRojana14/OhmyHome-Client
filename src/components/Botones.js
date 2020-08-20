import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider"; //	<-- UPDATE HERE
import Button from "react-bootstrap/Button";

class Botones extends Component {
  render() {
    const { logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        {isLoggedin ? (
          <>
            {/* <p className="navbar-user">username: {user.username}</p>{" "} */}
            {/* 	<-- UPDATE HERE     */}
            <Button variant="warning" onClick={logout}>
              Logout
            </Button>{" "}
            <Button variant="warning">
              <Link to="/tasks" style={{ textDecoration: "none" }}>
                Tasks
              </Link>
            </Button>
            <Button variant="warning">
              <Link to="/profile" style={{ textDecoration: "none" }}>
                Profile
              </Link>
            </Button>
            {/* 	<-- UPDATE HERE     */}
          </>
        ) : (
          <>
            <div className="auth-buttons">
              <Link to="/signup">
                <Button variant="warning">Sign up</Button>
              </Link>
              <Link to="/login">
                <Button variant="warning">Login</Button>
              </Link>
              <br />
            </div>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Botones); //	<-- UPDATE HERE
