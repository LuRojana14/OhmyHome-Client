import React from "react";
import { withAuth } from "../utils/AuthProvider";
// import axios from "axios";
// import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./Header.css";
import { Link } from "react-router-dom";

class Header extends React.Component {
  handleLogout = () => {
    this.props.logout().then(() => {
      window.location.reload();
    });
  };

  render() {
    if (this.props.isLoggedin) {
      return (
        <div className="header">
          <ul className="list-header">
            <li>
              <button className="logout-button">
                <Link style={{ color: "#FFDB15" }} to="/tasks">
                  Back
                </Link>
              </button>
            </li>
            <li>
              {" "}
              <button
                className="logout-button"
                onClick={() => this.props.history.push("/profile")}
              >
                {this.props.user.username}
              </button>
            </li>

            <li>
              <button className="logout-button" onClick={this.handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      );
    } else {
      return <div>Header</div>;
    }
  }
}

export default withRouter(withAuth(Header));
