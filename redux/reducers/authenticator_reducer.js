// reducers/counter_reducer.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    authentication: false,
  };

  //reducer function  for the authentication of user
  const counter_reducer = (state = initialState, action) => {
    switch(action.type){
      case "login": {
        return Object.assign({}, state, {authentication: true});
      }
      case "signup": {
        return Object.assign({}, state, {authentication: true});
      }
      case "logout": {
        return Object.assign({}, state, {authentication: false});
      }
      default: {
        return state;
      }
    }
  }
  export default counter_reducer;

export const UserStore = configureStore({reducer:{authen: counter_reducer}});
export const authenSelector = state => state.authen.authentication;