import React from "react";
import { OSList } from "../helpers/OSList";
import MenuItem from "../components/MenuItem";
import "../styles/Download.css";
import Logo from "../assets/ArconosLogo.png";
import { Link } from "react-router-dom";

function Download() {
  return (
    <div className="download">
      <Link to="/download"> <img className="arc-logo" src={Logo} /> </Link>
      <div className="dl-links">
        <ul>
          <li><Link to="/download"> Overview </Link></li>
          <li><Link to="/download"> Patch Notes </Link></li>
          <li><Link to="/download"> Help </Link></li>
        </ul>
      </div>
      <h1 className="menu-title">ArconOS Distributions</h1>
      <p> Choose a specific distro for your use cases below.</p>
      <div className="menu-list">
        {OSList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              desc={menuItem.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Download;
