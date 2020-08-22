import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
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
            <div className="containerauth-buttons">
              <div className="auth-buttons">
                {/* <div className="signup-button">
                  <Link to="/signup">
                    <Button variant="warning">Sign up</Button>
                  </Link> */}
              </div>
              <div className="login-button">
                <Link to="/login">
                  <Button variant="warning">Login</Button>
                </Link>
              </div>
              <div className="group-button">
                <Link to="/auth/signup">
                  <Button variant="warning">Create a Group</Button>
                </Link>
              </div>
              <br />
            </div>
            {/* </div> */}
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Botones);
