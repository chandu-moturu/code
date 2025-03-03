import React, { useEffect, useState, useRef, useContext } from "react";
import "./navbar.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);

  const menuRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false)
    }
  }, [token]);

  const handleClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setToken("");
    } else {
      navigate("/login");
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "de" ? "en" : "de";
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setMenuOpen(false);
      if (currentScrollY > 150 && lastScrollY <= 150) {
        setShowNavbar(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setShowNavbar(false);
      }

      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`nav-main ${showNavbar ? "show" : "hide"}`} ref={menuRef}>
      <div className="nav-container">
        <div className="nav-container-left">
          <div className="nav-container-items">
            <button className="action-nav">Book Your Look</button>
          </div>
          <div className="nav-lang-button">
            <div onClick={toggleLanguage}>
              {i18n.language === "de" ? "En" : "De"}
            </div>
          </div>
        </div>
        <div className="nav-container-mid">
          <div className="logo-div"></div>
          <h3>
            Dubai Lounge{" "}
            <span style={{ color: "orange", opacity: "0.5" }}>By Rody</span>
          </h3>
        </div>
        <div className="nav-container-right">
          <div className="nav-container-items">
            {/* <div>my appointments</div> */}

            <div>
              <button onClick={handleClick}>
                {isLoggedIn ? "Logout" : "Signup"}
              </button>
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
              {/* {!menuOpen ? "=" : "x"} */}
              <button>Menu</button>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-menu">
          <div className="nav-menu-container">
            <div className="nav-menu-items">
              <div className="nav-link-div">services</div>
              <div className="nav-link-div">about</div>
              <div className="nav-link-div">team</div>
              <div className="nav-link-div">prices</div>
              <div className="nav-link-div">my appointments</div>
            </div>
            {/* 
            <div className="nav-menu-buttons">
              <button>signup</button>
            </div> */}
            <div className="nav-menu-socials">
              <h1>Instagram</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
