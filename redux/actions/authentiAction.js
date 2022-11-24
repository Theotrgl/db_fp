// actions/counter_actions.js
//possibly useless code
const loginAction = (login_action) => {
    return {
      type: "Login",
      payload: login_action
    }
  }
const signupAction = (signup_action) => {
    return {
      type: "SignUp",
      payload: signup_action
    }
  }
const logoutAction = (logout_action) => {
    return {
      type: "Logout",
      payload: logout_action
    }
}
  export {loginAction, signupAction, logoutAction};