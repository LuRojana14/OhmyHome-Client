import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "./../../assets/locoppal.png";
import "./home.css";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <body className="home" />
        </Helmet>
        <div className="contenedor-main">
          <div className="contenedor-foto">
            <img className="fotoCasa" src={logo} alt="" />
          </div>
          <div className="titulo">
            <h2>ohMyHome</h2>
          </div>
        </div>
        <div className="contenedor-botonesHome">
          <Link to="/signup">
            <button className="button-home">New Home</button>
          </Link>
          <Link to="/login">
            <button className="button-home2">Join Home</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default HomePage;
