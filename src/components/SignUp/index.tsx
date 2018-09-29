import { History } from "history";
import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";
import SignUpForm from "./SingUpForm";

interface IHistory {
  history: History;
}

const SignUpComponent = (props: IHistory) => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm history={props.history} />
    </div>
  );
};

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export const SignUp = withRouter(SignUpComponent);
