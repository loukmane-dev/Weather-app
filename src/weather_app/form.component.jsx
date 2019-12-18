import React from "react";
import "./form.css";

const Form = ({ loadWeather, error }) => {
  console.log(error);
  return (
    <div className="container">
      <form onSubmit={loadWeather}>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="City"
              autoComplete="off"
              placeholder="City"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="Country"
              autoComplete="off"
              placeholder="Country"
            />
          </div>
          <div className="col-md-3 mt-md-0 text-md-left">
            <button className="btn btn-warning">Get weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
