import { actionTypes } from "../constants";

const initialState = {
  velocity: 0
};

const rootReducer = (state = initialState, action) => {
  if (action.type === actionTypes.UPDATE_VELOCITY) {
    return { ...state, velocity: action.payload.velocity };
  }

  return state;
};

export default rootReducer;
