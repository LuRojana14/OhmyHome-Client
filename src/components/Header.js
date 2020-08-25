import React from "react";
import { withAuth } from "../utils/AuthProvider";
// import axios from "axios";
// import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./Header.css";

class Header extends React.Component {
  handleLogout = () => {
    this.props.logout().then(() => {
      window.location.reload();
    });
  };

  render() {
    if (this.props.isLoggedin) {
      return (
        <div className="container-header">
          <div>
            <button className="logout-button" onClick={this.handleLogout}>
              Logout
            </button>
          </div>

          {/* <div style={{ flexGrow: 1 }}></div> */}
          <div>
            User:{" "}
            <a
              href=" "
              className="user-link"
              onClick={() => this.props.history.push("/profile")}
            >
              {this.props.user.username}
            </a>
          </div>
        </div>
      );
    } else {
      return <div>Header</div>;
    }
  }
}

export default withRouter(withAuth(Header));
