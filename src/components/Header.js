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
      this.props.history.push("/");
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
                  <i className="icon-back" class="fas fa-arrow-left"></i>
                </Link>
              </button>
            </li>
            <li>
              {/* <img className="logout-button" src="/assets/logout.png" alt="" onClick={this.handleLogout}/> */}
              <button className="logout-button" onClick={this.handleLogout}>
                Logout
                {/* <i className="icon-out" class="fas fa-door-open"></i> */}
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
