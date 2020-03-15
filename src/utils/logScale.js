import { LOG_SCALE_FACTORS } from "../constants";

const getValue = position => {
  return Math.exp(
    (position - LOG_SCALE_FACTORS.MIN_POS) * LOG_SCALE_FACTORS.LOG_SCALE +
      LOG_SCALE_FACTORS.MIN_VAL
  );
};

const getPosition = value => {
  return (
    LOG_SCALE_FACTORS.MIN_POS +
    (Math.log(value) - LOG_SCALE_FACTORS.MIN_VAL) / LOG_SCALE_FACTORS.LOG_SCALE
  );
};

export default { getValue, getPosition };
