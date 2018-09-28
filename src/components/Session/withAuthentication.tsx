import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { firebase } from "../../firebase";

import { setAuthUserAction } from "../../actions/index";

import * as Firebase from "firebase";

interface InterfaceProps {
  onSetAuthUser: ((authUser: Firebase.User | null) => void);
}

export const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<InterfaceProps> {

    public componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => this.props.onSetAuthUser(authUser));
    }

    public render() {
      return (<Component />);
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetAuthUser: (authUser: Firebase.User | null) => { dispatch(setAuthUserAction(authUser)); }
  });

  return connect(
    null,
    mapDispatchToProps
  )(WithAuthentication);
};
