import React from "react";
import Search from "./Search.js";
import "../styles/Nav.css";

function Nav({ beginSort }) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="navbar-collapse row" id="navbarNav">
        <Search handleSearchChange={beginSort} />
      </div>
    </nav>
  );
}
export default Nav;