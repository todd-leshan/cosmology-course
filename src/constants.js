export const actionTypes = {
  UPDATE_VELOCITY: "UPDATE_VELOCITY"
};

const MAX_POS = 201;
const MIN_POS = 1;

const MIN_VAL = Math.log(MIN_POS);
const MAX_VAL = Math.log(MAX_POS);

export const LOG_SCALE_FACTORS = {
  MAX_POS,
  MIN_POS,
  MIN_VAL,
  MAX_VAL,
  POS_OFFSET: 100,
  LOG_SCALE: (MAX_VAL - MIN_VAL) / (MAX_POS - MIN_POS)
};
