import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/mainBG.png";
import "../styles/Home.css";


function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="header-container">
        <h1> Online College Cookbook </h1>
        <p> The website that helps College Student to not starve.</p>
      </div>
    </div>
  );
}

export default Home;
