import { SessionState } from "redux/reducers/session";

export interface ApplicationState {
  readonly session: SessionState;
}
