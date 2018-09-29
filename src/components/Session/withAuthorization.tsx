import { History } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as routes from "../../constants/routes";
import { firebase } from "../../firebase";

import { IRootState, ISessionState } from "../../models/State";

interface InterfaceProps extends ISessionState {
  history?: History;
}

export const withAuthorization = (condition: ((user: any) => boolean)) => (Component: React.ComponentType) => {
  class WithAuthorization extends React.Component<InterfaceProps> {

    public componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history!.push(routes.SIGN_IN);
        }
      });
    }

    public render() {
      return this.props.authUser ? <Component /> : null;
    }
  }

  const mapStateToProps = (state: IRootState) => ({
    authUser: state.sessionState.authUser
  });

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(WithAuthorization);
};
