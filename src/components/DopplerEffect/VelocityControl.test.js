import React from "react";
import { render, waitForElement } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import ReactTestUtils from "react-dom/test-utils";
import VelocityControl from "./VelocityControl";

const mockStore = configureMockStore();

describe("VelocityControl", () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({ velocity: 10 });

    component = render(
      <Provider store={store}>
        <VelocityControl />
      </Provider>
    );
  });

  test("should render input box with value as 10 ", () => {
    const inputBox = component.container.querySelector(`[id="velocity-input"]`);

    expect(inputBox).toBeInTheDocument();
    expect(inputBox).toHaveValue(10);
  });

  test("should render range slider ", () => {
    const slider = component.container.querySelector(`[id="velocity-slider"]`);
    expect(slider).toBeInTheDocument();
  });

  test("should dispatch UPDATE_VELOCITY action when updating input box value", () => {
    const inputBox = component.container.querySelector(`[id="velocity-input"]`);

    ReactTestUtils.Simulate.change(inputBox, {
      target: { value: 100, validity: { valid: true } }
    });

    expect(inputBox).toHaveValue(100);

    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()).toEqual([
      {
        payload: {
          velocity: 101
        },
        type: "UPDATE_VELOCITY"
      }
    ]);
  });

  test("should dispatch UPDATE_VELOCITY action when moving slider", async () => {
    const slider = component.container.querySelector(`[id="velocity-slider"]`);

    ReactTestUtils.Simulate.change(slider, {
      target: { value: 1, validity: { valid: true } }
    });

    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()).toEqual([
      {
        payload: {
          velocity: -99
        },
        type: "UPDATE_VELOCITY"
      }
    ]);
  });
});
