import React, { useState, useEffect } from "react";
import "./scrollUpButton.css";

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scroll-up-btn ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      ↑
      {/* ^ */}
    </div>
  );
};

export default ScrollUpButton;
