import React from "react";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          marginTop: "50px",
          width: "400px",
        }}
      >
        We couldn't find the page you are looking for 🙇
      </div>
    );
  }
}

export default NotFoundPage;
