import React from "react";
import { connect } from "react-redux";
import CanvasWithImg from "../components/DopplerEffect/CanvasWithImg";
import VelocityControl from "../components/DopplerEffect/VelocityControl";

const mapStateToProps = state => ({
  velocity: state.velocity
});

const DopplerEffect = ({ velocity }) => {
  return (
    <>
      <CanvasWithImg imagePath="star-small.png" velocity={velocity} />
      <div className="controls-container">
        <form action="#">
          <VelocityControl />
        </form>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(DopplerEffect);
