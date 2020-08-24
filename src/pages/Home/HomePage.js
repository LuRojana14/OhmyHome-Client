import React, { Component } from "react";
import { Helmet } from "react-helmet";
import logo from "./../../assets/logoynombre.png"
import "./home.css"


class HomePage extends Component {
    render() {
      return (
        <div>
        <Helmet>
        <body className="home"/>
        </Helmet>
        <div className="contenedor-foto">
        <img className="fotoCasa" src={logo} alt="" /> 
        </div>
        </div>
      );
    }
}


export default HomePage;