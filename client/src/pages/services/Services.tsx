import React from "react";
import './services.css'

export const Services = () => {
  return (
    <div className="services-main">
      <div className="services-main-container">
        <div className="services-header">
          <h1>
            What We Provide <br />
            To Our Customers
          </h1>
        </div>
        <div className="services-container">
          <div className="services-left">
            <div className="services-cards-left">
              <div className="services-card">
                <h2>Hair Styles</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis unde nihil suscipit nesciunt ab, repellendus hic
                </p>
              </div>
              <div className="services-card">
                <h2>Hair Curly</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis unde nihil suscipit nesciunt ab, repellendus hic
                </p>
              </div>
            </div>
            <div className="services-cards-right">
              <div className="services-card">
                <h2>Coloring</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis unde nihil suscipit nesciunt ab, repellendus hic
                </p>
              </div>
              <div className="services-card">
                <h2>Hair Straight</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis unde nihil suscipit nesciunt ab, repellendus hic
                </p>
              </div>
            </div>
          </div>
          <div className="services-right">
            <h1>Image comes here</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
