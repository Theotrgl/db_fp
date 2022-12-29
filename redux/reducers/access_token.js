import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
};

function accreducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        access_token: action.payload
      };
    default:
      return state;
  }
}

export const access_store = configureStore({reducer:{access: accreducer}});

const refreshState = {
  refresh_token: "",
};

function rereducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        access_token: action.payload
      };
    default:
      return state;
  }
}

export const refresh_store = configureStore({reducer:{refresh: rereducer}});