import React               from "react";
import {connect}           from "react-redux";

import {initializeSession} from "app/auth/actions";
import {isTokenSet}        from "app/auth/auth_token";

const select = (state) => ({
  isInitializingSession: state.auth.isInitializingSession,
  sessionValid: state.auth.sessionValid
});

/**
* Entry point for the whole App this includes secured and not secured content.
* Application gets composed by redux therefore we can access to all the redux
* sugar from here after.
*/
@connect(select)
export default class ApplicationContainer extends React.Component {

  render () {
    return (
      <div>{this.props.children}</div>
    );
  }
}
