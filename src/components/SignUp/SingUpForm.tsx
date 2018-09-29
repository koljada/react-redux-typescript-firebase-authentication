import { History } from "history";
import * as React from "react";
import * as routes from "../../constants/routes";
import { auth, db } from "../../firebase";
import User from "../../models/User";

interface IProps {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
  username?: string;
  
  error?: any;

  history: History;
}

interface IState {
  email: string;
  error: any;
  passwordOne: string;
  passwordTwo: string;
  username: string;
}

export default class SignUpForm extends React.Component<IProps, IState> {
  private static readonly INITIAL_STATE: IState = {
    email: "",
    error: null,
    passwordOne: "",
    passwordTwo: "",
    username: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: IProps) {
    super(props);
    this.state = { ...SignUpForm.INITIAL_STATE };
    this.bindEvents();
  }  

  public onSubmit(event: React.FormEvent) {
    event.preventDefault();

    auth
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
      .then((user: User) => {
        user.name = this.state.username;
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(user)
          .then(() => {
            this.setState(() => ({ ...SignUpForm.INITIAL_STATE }));
            this.props.history.push(routes.HOME);
          })
          .catch(error => {
            console.error(error);
            this.setState(SignUpForm.propKey("error", error));
          });
      })
      .catch(error => {
        console.error(error);
        this.setState(SignUpForm.propKey("error", error));
      });
  }

  public render() {

    const isInvalid =
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === "" ||
      this.state.email === "" ||
      this.state.username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="username"
          value={this.state.username}
          onChange={this.setStateWithEvent}
          type="text"
          placeholder="Full Name"
        />
        <input
          id="email"
          value={this.state.email}
          onChange={this.setStateWithEvent}
          type="text"
          placeholder="Email Address"
        />
        <input
          id="passwordOne"
          value={this.state.passwordOne}
          onChange={this.setStateWithEvent}
          type="password"
          placeholder="Password"
        />
        <input
          id="passwordTwo"
          value={this.state.passwordTwo}
          onChange={this.setStateWithEvent}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState(SignUpForm.propKey(event.target.id, event.target.value));
  }

  private bindEvents() {
    this.setStateWithEvent = this.setStateWithEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
}
