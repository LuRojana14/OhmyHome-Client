import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider"; //	<-- UPDATE HERE

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1> {/* 	<-- UPDATE HERE	      */}
      </div>
    );
  }
}

export default withAuth(Private);
