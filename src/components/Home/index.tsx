import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { db } from "../../firebase";
import { IRootState } from "../../models/State";
import { UserList } from "./UserList";

import * as actions from '../../actions';

import { IUserHash } from "../../models/User";

import { withAuthorization } from "../Session/withAuthorization";

type UsersAction = ActionType<typeof actions.setUsersAction>;

interface IProps {
  onSetUsers: ((users: IUserHash) => UsersAction);
  users: IUserHash;
}

class HomeComponent extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
    // console.log('Home Component props', this.props, this.state);
  }

  public componentDidMount() {
    db.onceGetUsers().then(snapshot => {
      // console.log('snap', snapshot.val());
      this.props.onSetUsers(snapshot.val() as IUserHash);
    });
  }

  public render() {
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <UserList users={this.props.users} />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  users: state.userState.users
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetUsers: (users: IUserHash) => dispatch(actions.setUsersAction(users))
});

const authCondition = (authUser: any) => !!authUser;

export const Home = compose(
  withAuthorization(authCondition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomeComponent);
