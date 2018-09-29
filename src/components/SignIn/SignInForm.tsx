import { History } from "history";
import * as React from "react";
import * as routes from "../../constants/routes";
import { auth } from "../../firebase";

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: History;
  password?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}

export class SignInForm extends React.Component<InterfaceProps, InterfaceState> {
  private static INITIAL_STATE = {
    email: "",
    error: null,
    password: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInForm.INITIAL_STATE };
    this.bindEvents();
  }

  public onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    auth
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState(() => ({ ...SignInForm.INITIAL_STATE }));
        this.props.history!.push(routes.HOME);
      })
      .catch(error => {
        this.setState(SignInForm.propKey("error", error));
      });
  };

  public render() {
    const isInvalid = this.state.password === "" || this.state.email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="email"
          value={this.state.email}
          onChange={this.setStateWithEvent}
          type="text"
          placeholder="Email Address"
        />
        <input
          id="password"
          value={this.state.password}
          onChange={this.setStateWithEvent}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState(SignInForm.propKey(event.target.id, event.target.value));
  }

  private bindEvents() {
    this.setStateWithEvent = this.setStateWithEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
}