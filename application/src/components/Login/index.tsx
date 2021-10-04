import styles from "components/Login/login.module.scss";
import { SimpleSpinner } from "components/SimpleSpinner";
import { ProcessingState } from "enums/processingState";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "firebaseApp";
import { onInputChangeWrapper } from "helpers/onInputChangeWrapper";
import React, { FormEvent } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Redirect } from "react-router";
import { Action } from "redux/action";
import { ApplicationState } from "redux/applicationState";
import { SESSION_AUTHENTICATION_STARTED } from "redux/constants";
import { SessionState } from "redux/reducers/session";

interface DispatchProps {
  startAuthentication(): void;
  authenticationFailed(): void;
}

type Props = SessionState & DispatchProps;

const Login: React.FC<Props> = (props: Props): React.ReactElement => {
  const [error, setError] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const ignore = (event: FormEvent): void => {
    event.preventDefault();
  };

  const onSignIn = (): void => {
    // / FIXME: use an action
    const auth = getAuth(firebaseApp);

    props.startAuthentication();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError("");
      })
      .catch((error: FirebaseError): void => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email, please type in a proper email");
            break;
          case "auth/user-not-found":
            setError("User does not exist");
            break;
          case "auth/wrong-password":
            setError("Invalid password");
            break;
          case "auth/internal-error":
            setError("Internal firebase error");
            break;
          default:
            console.warn(error.code);
        }
        props.authenticationFailed();
      });
  };

  if (props.processingState === ProcessingState.Preparing) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading, please wait&hellip;</div>
      </div>
    );
  } else if (props.currentUser !== null) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={ignore}>
        <h1>Welcome!</h1>
        <div className={styles.field}>
          <label htmlFor={"email"}>User</label>
          <input
            id={"email"}
            type={"email"}
            onChange={onInputChangeWrapper(setEmail)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            onChange={onInputChangeWrapper(setPassword)}
          />
        </div>
        <div className={styles.error}>{error}</div>
        <div className={styles.buttons}>
          <button type={"submit"} onClick={onSignIn}>
            {props.processingState === ProcessingState.Loading ? (
              <SimpleSpinner />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps: MapStateToProps<SessionState, any, ApplicationState> = (
  state: ApplicationState,
): SessionState => state.session;

const mapDispatchToProps: MapDispatchToProps<DispatchProps, any> = {
  startAuthentication: (): Action => ({
    type: SESSION_AUTHENTICATION_STARTED,
  }),
  authenticationFailed: (): Action => ({
    type: SESSION_AUTHENTICATION_STARTED,
  }),
};
const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(Login);
