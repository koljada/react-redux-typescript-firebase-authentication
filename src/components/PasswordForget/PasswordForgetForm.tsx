import * as React from "react";
import { auth } from "../../firebase";

interface IState {
  email: string,
  error: any
}

export class PasswordForgetForm extends React.Component<{}, IState> {
  private static readonly INITIAL_STATE = {
    email: "",
    error: null
  };

  private static propKey(propertyName: string, value: string) {
    return { [propertyName]: value } as object;
  }

  constructor(props: any) {
    super(props);

    this.state = { ...PasswordForgetForm.INITIAL_STATE };
    this.bindEvents();
  }

  public onSubmit = (event: React.FormEvent) => {
    auth
      .doPasswordReset(this.state.email)
      .then(() => {
        this.setState(() => ({ ...PasswordForgetForm.INITIAL_STATE }));
      })
      .catch(error => {
        console.log(error);
        this.setState(PasswordForgetForm.propKey("error", error));
      });

    event.preventDefault();
  };

  public render() {
    const isInvalid = this.state.email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="email"
          value={this.state.email}
          onChange={this.setStateWithEvent}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState(PasswordForgetForm.propKey(event.target.id, event.target.value));
  }

  private bindEvents() {
    this.setStateWithEvent = this.setStateWithEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
}
