import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const Weather = ({ city, celsius, temp_max, temp_min, description, icon }) => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        <h1>{city}</h1>
        <h5 className="py-4">
          <i className={`wi ${icon} display-1 py-4`} />
        </h5>
        {celsius ? <h1 className="py-2">{celsius}&deg;</h1> : null}
        {minmaxTemp(temp_max, temp_min)}
        <h4 className="py-3">{description}</h4>
      </div>
    </div>
  );
};
const minmaxTemp = (min, max) => {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
};

export default Weather;
