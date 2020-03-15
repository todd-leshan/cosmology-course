import React, { useState } from "react";
import { connect } from "react-redux";

import { updateVelocity } from "../../redux/actions";

const mapStateToProps = state => ({
  velocity: state.velocity
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateVelocity: ({ velocity }) =>
    dispatch(updateVelocity({ velocity }))
});

const VelocityControl = ({ velocity, dispatchUpdateVelocity }) => {
  const [velocityInput, setVelocityInput] = useState(0);

  const onVelocityInput = e => {
    const inputValue = e.target.value;
    setVelocityInput(inputValue);

    if (inputValue === "-" || inputValue === "") {
      return;
    }

    const velocity = e.target.validity.valid ? parseInt(inputValue, 10) : 0;

    dispatchUpdateVelocity({ velocity });
  };

  const onRangeChange = e => {
    const inputValue = parseInt(e.target.value, 10);
    setVelocityInput(inputValue);
    dispatchUpdateVelocity({ velocity: inputValue });
  };

  return (
    <>
      <label htmlFor="velocity-input">
        Velocity (km/s){" "}
        <input
          type="number"
          min="-100"
          max="100"
          id="velocity-input"
          value={velocityInput}
          onChange={onVelocityInput}
        />
      </label>
      <label htmlFor="velocity-range">
        <input
          type="range"
          min="-100"
          max="100"
          value={velocity}
          onChange={onRangeChange}
        />
      </label>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VelocityControl);
