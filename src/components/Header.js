import React from "react";
import { withAuth } from "../utils/AuthProvider";
// import axios from "axios";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
// import "./Header.css";

class Header extends React.Component {
  handleLogout = () => {
    this.props.logout().then(() => {
      window.location.reload();
    });
  };

  render() {
    if (this.props.isLoggedin) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            paddingRight: "20px",
            height: "70px",
            backgroundColor: "#FF5765",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 0px",
          }}
        >
          <Button onClick={this.handleLogout} variant="link">
            Logout
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          <span>
            User:{" "}
            <a
              onClick={() => this.props.history.push("/profile")}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {this.props.user.username}
            </a>
          </span>
        </div>
      );
    } else {
      return <div>Header</div>;
    }
  }
}

export default withRouter(withAuth(Header));
