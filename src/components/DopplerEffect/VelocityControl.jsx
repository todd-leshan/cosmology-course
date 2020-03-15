import React, { useState } from "react";
import { connect } from "react-redux";

import { updateVelocity } from "../../redux/actions";
import { LOG_SCALE_FACTORS } from "../../constants";
import LogScale from "../../utils/logScale";

const mapStateToProps = state => ({
  velocity: state.velocity
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateVelocity: ({ velocity }) =>
    dispatch(updateVelocity({ velocity }))
});

const VelocityControl = ({ velocity, dispatchUpdateVelocity }) => {
  const [velocityInput, setVelocityInput] = useState(velocity);

  const onVelocityInput = e => {
    const inputValue = e.target.value;
    setVelocityInput(inputValue);

    if (inputValue === "-" || inputValue === "") {
      return;
    }

    const velocity = e.target.validity.valid ? parseInt(inputValue, 10) + 1 : 0;

    dispatchUpdateVelocity({ velocity });
  };

  const onRangeChange = e => {
    const inputValue = parseInt(e.target.value, 10);
    const scaledValue = (
      LogScale.getValue(inputValue) - LOG_SCALE_FACTORS.POS_OFFSET
    ).toFixed(1);

    setVelocityInput(scaledValue - 1);
    dispatchUpdateVelocity({ velocity: Number(scaledValue) });
  };

  return (
    <div className="controls-container">
      <form action="#">
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
            id="velocity-slider"
            type="range"
            min={LOG_SCALE_FACTORS.MIN_POS}
            max={LOG_SCALE_FACTORS.MAX_POS}
            value={LogScale.getPosition(
              velocity + LOG_SCALE_FACTORS.POS_OFFSET
            )}
            onChange={onRangeChange}
          />
        </label>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VelocityControl);
