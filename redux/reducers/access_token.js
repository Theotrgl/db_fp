import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  access_token: ""
};

function accreducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
}

export const access_store = configureStore({reducer:{access: accreducer}});