import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { firebase } from "../../firebase";

import { setAuthUser } from "../../actions/index";

import * as Firebase from "firebase";


interface InterfaceProps {
  authUser?: any;
}

interface InterfaceState {
  authUser?: any;
}

export const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    public componentDidMount() {
      const { onSetAuthUser }: any = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser ? onSetAuthUser(authUser) : onSetAuthUser(null);
      });
    }

    public render() {
      return <Component />;
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetAuthUser: (authUser: Firebase.User) => dispatch(setAuthUser(authUser))
  });

  return connect(
    null,
    mapDispatchToProps
  )(WithAuthentication);
};
