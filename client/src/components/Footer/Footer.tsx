import React from "react";
import './footer.css'


const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-top">
        <h1>Dubai Lounge By Rody</h1>
      </div>
      <div className="footer-mid">
        <div className="footer-mid-top">
          <div className="footer-logo">
            {/* <h1>Logo Comes Here</h1> */}
            <div className="footer-logo-img"></div>
          </div>
          <div className="timings">
            <ul className="timings-day">
              <li>Mon</li>
              <li>tue</li>
              <li>wed</li>
              <li>thu</li>
              <li>fri</li>
              <li>sat</li>
              <li>sun</li>
            </ul>
            <ul className="timings-time">
              <li>10.00 am - 09.00 pm</li>
              <li>10.00 am - 09.00 pm</li>
              <li>10.00 am - 09.00 pm</li>
              <li>10.00 am - 09.00 pm</li>
              <li>10.00 am - 09.00 pm</li>
              <li>10.00 am - 09.00 pm</li>
              <li>Closed</li>
            </ul>
          </div>
          <div className="footer-notice">
            <h3>
              Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit.
              Possimus, eum?
              <br /> Nemo praesentium, cum quidem <br />
              unde error hic porro placeat
            </h3>
          </div>
          <div className="footer-contact">
            <div>
              <ul>
                <li>Address</li>
                <li>phone No</li>
                <li>email</li>
              </ul>
              <div>
                <h3>social media icons</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="footer-copyright">
          <h3>Dubai Lounge by Rody &#169; All rights reserved 2025</h3>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="map">
          <h1>Map comes here</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
