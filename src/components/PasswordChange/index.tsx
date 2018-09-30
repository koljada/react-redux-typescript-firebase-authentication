import { History } from "history";
import * as React from "react";
import * as routes from "../../constants/routes";
import { auth } from "../../firebase";

interface InterfaceProps {
  error?: any;
  history?: History;
  passwordOne?: string;
  passwordTwo?: string;
}

interface InterfaceState {
  error?: any;
  passwordOne?: string;
  passwordTwo?: string;
}

export class PasswordChangeForm extends React.Component<InterfaceProps, InterfaceState> {
  private static readonly INITIAL_STATE = {
    error: null,
    passwordOne: "",
    passwordTwo: ""
  };

  private static propKey(propertyName: string, value: string): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...PasswordChangeForm.INITIAL_STATE };
    this.bindEvents();
  }

  public onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    auth
      .doPasswordUpdate(this.state.passwordOne!)
      .then(() => {
        this.setState(() => ({ ...PasswordChangeForm.INITIAL_STATE }));
        console.log('after updeate',this.props);
        this.props.history!.push(routes.ACCOUNT)
      })
      .catch(error => {
        console.error(error);
        this.setState(PasswordChangeForm.propKey("error", error));
      });
  };

  public render() {
    const isInvalid = this.state.passwordOne !== this.state.passwordTwo || this.state.passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="passwordOne"
          value={this.state.passwordOne}
          onChange={this.setStateWithEvent}
          type="password"
          placeholder="New Password"
        />
        <input
          id="passwordTwo"
          value={this.state.passwordTwo}
          onChange={this.setStateWithEvent}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState(PasswordChangeForm.propKey(event.target.id, event.target.value));
  }

  private bindEvents(){
    this.setStateWithEvent = this.setStateWithEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
}
