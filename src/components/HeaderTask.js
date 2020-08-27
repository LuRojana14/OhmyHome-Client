import React from "react";
import { withAuth } from "../utils/AuthProvider";
// import axios from "axios";
// import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./HeaderTask.css";
// import { Link } from "react-router-dom";

class HeaderTask extends React.Component {
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
          <ul className="contains-header">
            <li>
              {" "}
              <button
                className="logout-button"
                onClick={() => this.props.history.push("/profile")}
              >
                <div className="container-user">
                  <div className="container-iconuser">
                    <i className="icon-user" class="far fa-user"></i>
                  </div>
                  <div>{this.props.user.username}</div>
                </div>
              </button>
            </li>

            <li>
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

export default withRouter(withAuth(HeaderTask));
