import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { ApplicationState } from "redux/applicationState";
import { SessionState } from "redux/reducers/session";

interface OwnProps {
  readonly path: string;
  readonly component: React.ComponentType;
  readonly exact?: boolean;
}

type Props = OwnProps & SessionState;

const ProtectedRoute: React.FC<Props> = (props: Props): React.ReactElement => {
  if (props.currentUser === null) {
    return <Redirect to={"/login"} />;
  }

  return (
    <Route path={props.path} component={props.component} exact={props.exact} />
  );
};

const mapStateToProps: MapStateToProps<SessionState, any, ApplicationState> = (
  state: ApplicationState,
): SessionState => state.session;

const mapDispatchToProps: MapDispatchToProps<any, any> = {};
const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ProtectedRoute);
