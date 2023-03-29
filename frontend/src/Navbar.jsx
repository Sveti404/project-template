import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/chart">Chart</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;