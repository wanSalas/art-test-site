import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/mainBG.png";
import "../styles/Home.css";


function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="header-container">
        <h1> ArconOS </h1>
        <p> Next-gen Linux Gaming.</p>
        <Link to="/menu">
          <button> DOWNLOAD </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
