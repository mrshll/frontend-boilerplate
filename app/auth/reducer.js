import Types         from "./types";
import {storeToken}  from "./auth_token";
import matchesAction from "app/utils/matches_action";
import * as ih       from "app/utils/immutable_helpers";

const initialState = ih.immutable({
  authenticating: false,
  authenticationError: null,
  user: null
});


export default function reducer (state = initialState, action) {

  if (matchesAction(action, Types.AUTHENTICATE.request)) {
    state = ih.set(state, "authenticating", true);
  }

  if (matchesAction(action, Types.AUTHENTICATE.done)) {
    const token = action.apiResponse.token;
    storeToken(token);

    state = ih.set(state, "authenticating", false);
    state = ih.set(state, "user", action.apiResponse.user);
  }

  if (matchesAction(action, Types.AUTHENTICATE.fail)) {
    state = ih.set(state, "authenticationError", action.apiError);
    state = ih.set(state, "authenticating", false);
  }

  return state;
}
