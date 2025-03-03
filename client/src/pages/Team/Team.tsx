import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./team.css";
import careersImg from "../../assets/pexels-moisesenlinea-7919442.jpg";
import teammem from '../../assets/pexels-shkrabaanthony-4625641.jpg'

const Team = () => {
  return (
    <div className="team-main">
      <div className="team-main-container">
        <div className="team-container">
          <div className="team-header">
            <div className="team-header-h1">
              <h1>Meet Our Experts</h1>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            </p>
          </div>
          <div className="team-section">
            <div className="team-experts">
              <div className="team-expert-member">
                <div className="member-details">
                  Chandra Sekhar <br />
                  Web Developer
                </div>
                {/* <img src={teammem} className="career-back-img" alt="" /> */}
                <LazyLoadImage
                  src={teammem}
                  className="expert-back-img"
                  alt="Chandra Sekhar"
                  effect="blur"
                  loading="lazy"
                />
              </div>
              <div className="team-expert-member">
                <div className="member-details">
                  Chandra Sekhar <br />
                  Web Developer
                </div>
                {/* <img src={teammem} className="career-back-img" alt="" /> */}
                <LazyLoadImage
                  src={teammem}
                  className="expert-back-img"
                  alt="Chandra Sekhar"
                  effect="blur"
                  loading="lazy"
                />
              </div>
              <div className="team-careers-card">
                {/* <img className="career-back-img" src={careersImg} alt="" /> */}
                <div className="careers-info">
                  <h3>Would you like to join our team?</h3>
                  <p>send resume...</p>
                </div>
              </div>
            </div>
            <div className="team-members"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
