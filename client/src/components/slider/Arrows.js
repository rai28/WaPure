import React from "react";

function Arrows({ prevSlide, nextSlide }) {
  return (
    <div className="arrows">
      <span className="prev" onClick={prevSlide}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/271/271218.png"
          width="25px"
          height="25px"
          alt="next"
        />
      </span>
      <span className="next" onClick={nextSlide}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/271/271226.png"
          width="25px"
          height="25px"
          alt="next"
        />
      </span>
    </div>
  );
}

export default Arrows;
