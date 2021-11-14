import React from "react";
import Slider from "../components/slider/Slider";
import CardContent from "../components/cards/CardContent";
import Footer from "../components/footer/Footer.js";
import { Link } from "react-router-dom";
export default function HomeScreen() {
  return (
    <div>
      <Slider />
      <div>
        <div className="about-this-para">
          <p className="dashboard-main-heading">
            Test Your Water Quality <br />
            <span className="sm-font">
              No more waiting for long months for lab test.
            </span>
          </p>
        </div>
        <div className="my-footer-buttons">
          <Link to="/new-report">
            <span className="check-here-button">&nbsp; Check Here &nbsp;</span>
          </Link>
          <Link to="/new-report">
            <span className="get-certified-button check-here-button">
              &nbsp; Get Certified &nbsp;
            </span>
          </Link>
        </div>
      </div>

      <div>
        <p className="services-heading">Services We Provide</p>
        <CardContent />
      </div>
      <Footer />
    </div>
  );
}
