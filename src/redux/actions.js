import { actionTypes } from "../constants";

export const updateVelocity = ({ velocity }) => {
  return {
    type: actionTypes.UPDATE_VELOCITY,
    payload: { velocity }
  };
};
