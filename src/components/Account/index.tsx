import { History } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";

import { PasswordChangeForm } from "../PasswordChange";
import { PasswordForgetForm } from "../PasswordForget/PasswordForgetForm";
import { withAuthorization } from "../Session/withAuthorization";

import { IRootState } from "../../models/State";
import User from "../../models/User";

interface IProps {
  history?: History;
  authUser: User | null;
}

class AccountComponent extends React.Component<IProps> {
  public render() {
    console.log('acc', this.props.history);
    return (
      <div>
        <h1>Account: {this.props.authUser!.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm history={this.props.history} />
      </div>
    )
  }
};

const mapStateToProps = (state: IRootState) => ({
  authUser: state.sessionState.authUser
});

const authCondition = (authUser: any) => !!authUser;

export const Account = compose(
  withAuthorization(authCondition),
  withRouter,
  connect(mapStateToProps)
)(AccountComponent);
