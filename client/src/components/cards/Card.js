import React from "react";
import "./cardStyle.css";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="card">
      <div className="card__body">
        <img src={props.img} className="card__image" alt="card images" />
        <h2 className="card__title">
          <u>{props.title}</u>
        </h2>
        <p className="card__description">{props.description}</p>
      </div>
      <div className="know-btn">
        <Link to="/contact-us">
          <span className="card__btn">Learn More</span>
        </Link>
      </div>
    </div>
  );
}

export default Card;
