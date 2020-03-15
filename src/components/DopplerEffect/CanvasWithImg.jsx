import React, { Component } from "react";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";

export default class CanvasWithImg extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.originalImageData = null;

    this.state = {
      imageSrc: ""
    };

    this.applyVelocity = this.applyVelocity.bind(this);

    this.throttledApplyVelocity = throttle(velocity => {
      this.applyVelocity(velocity);
    }, 100);
  }

  componentDidMount() {
    import(`../../assets/${this.props.imageName}`)
      .then(image => {
        this.setState({
          imageSrc: image.default
        });
      })
      .then(() => {
        const canvasImg = document.getElementById("canvasImage");
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");

        canvasImg.onload = () => {
          this.canvas.width = canvasImg.width;
          this.canvas.height = canvasImg.height;

          this.ctx.drawImage(
            canvasImg,
            0,
            0,
            canvasImg.width,
            canvasImg.height
          );
          const imageDataObj = this.ctx.getImageData(
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
          this.originalImageData = [...imageDataObj.data];
        };
      });
  }

  componentDidUpdate(prevProps) {
    const { velocity } = this.props;
    if (prevProps.velocity !== velocity) {
      this.throttledApplyVelocity(velocity);
    }
  }

  applyVelocity(velocity) {
    if (this.originalImageData === null) {
      return;
    }

    const factor = Math.abs(velocity / 100);

    const data = [...this.originalImageData];

    for (let i = 0; i < data.length; i += 4) {
      data[i] =
        velocity < 0
          ? this.reduceColor(data[i], factor)
          : this.enhanceColor(data[i], factor);
      data[i + 1] = this.reduceColor(data[i + 1], factor);
      data[i + 2] =
        velocity < 0
          ? this.enhanceColor(data[i + 2], factor)
          : this.reduceColor(data[i + 2], factor);
    }

    const newImageData = new ImageData(
      new Uint8ClampedArray(data),
      this.canvas.width,
      this.canvas.height
    );

    this.ctx.putImageData(newImageData, 0, 0);
  }

  enhanceColor(pixelColor, factor) {
    return pixelColor + (255 - pixelColor) * factor;
  }

  reduceColor(pixelColor, factor) {
    return pixelColor + (0 - pixelColor) * factor;
  }

  render() {
    return (
      <div className="canvas-container">
        <canvas ref={this.canvasRef}></canvas>
        <img
          id="canvasImage"
          src={this.state.imageSrc}
          alt="hidden for canvas"
        />
      </div>
    );
  }
}

CanvasWithImg.propTypes = {
  imageName: PropTypes.string.isRequired,
  velocity: PropTypes.number.isRequired
};
