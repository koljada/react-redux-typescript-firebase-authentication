import * as React from "react";
import { IUserHash } from "../../models/User";

interface IProps {
  users?: IUserHash;
}

export class UserList extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {this.props.users && Object.keys(this.props.users).map((key, ind) => (
          <div key={key}><span>{ind + 1}.</span> {this.props.users![key].name}</div>
        ))}
      </div>
    );
  }
}
