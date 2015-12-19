import Types from "./types";

import {
  fetchSession as fetchSessionCall,
  authenticate as authenticateCall
} from "./api";


export function authenticate (email, password) {
  return {
    type: Types.AUTHENTICATE,
    callAPI: () => authenticateCall({email, password})
  }
}
