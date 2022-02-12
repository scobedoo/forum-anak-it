import React, { useState } from "react";
import "../styles/navbar.scss";
import PopupLogin from "./PopupLogin";
import PopupRegister from "./PopupRegister";

const Navbar = () => {
  const [showPopupLogin, setShowPopupLogin] = useState(false);
  const [showPopupRegister, setShowPopupRegister] = useState(false);

  return (
    <nav>
      <div className="container">
        <div className="nav-wrapper">
          <div className="nav-logo">
            <span>Forum anak IT</span>
          </div>
          <div className="nav-search">
            <form>
              <input type="text" placeholder="Search.." name="search" />
              <i className="fa fa-search icon"></i>
            </form>
          </div>
          <div className="nav-menu">
            <ul>
              <li>
                <div className="dropdown">
                  <a href="/">Categories</a>
                  <div className="dropdown-content">
                    <a href="/">Linux</a>
                    <a href="/">Windows</a>
                    <a href="/">MAC OS</a>
                    <a href="/">Android</a>
                    <a href="/">IOS</a>
                  </div>
                </div>
              </li>
              <li>
                <button onClick={() => setShowPopupLogin(true)}>Login</button>
                <PopupLogin
                  trigger={showPopupLogin}
                  setTrigger={setShowPopupLogin}
                />
              </li>
              <li>
                <button onClick={() => setShowPopupRegister(true)}>
                  Register
                </button>
                <PopupRegister
                  trigger={showPopupRegister}
                  setTrigger={setShowPopupRegister}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
