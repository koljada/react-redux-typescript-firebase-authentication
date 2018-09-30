import { History } from "history";
import * as React from "react";
import { withRouter } from "react-router-dom";
import { PasswordForgetLink } from "../PasswordForget";
import { SignUpLink } from "../SignUp";
import { SignInForm } from "./SignInForm";

const SignInComponent = (props: { history: History }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={props.history} />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);

export const SignIn = withRouter(SignInComponent);
