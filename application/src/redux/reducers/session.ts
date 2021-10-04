import { ProcessingState } from "enums/processingState";
import { User } from "firebase/auth";
import { Action } from "redux/action";
import {
  SESSION_AUTHENTICATED,
  SESSION_AUTHENTICATION_FAILED,
  SESSION_AUTHENTICATION_STARTED,
  SESSION_SIGNED_OUT,
} from "redux/constants";

export interface SessionState {
  readonly currentUser: User | null;
  readonly processingState: ProcessingState;
}

const initialState: SessionState = {
  currentUser: null,
  processingState: ProcessingState.Preparing,
};

const reducer = (
  state: SessionState = initialState,
  action: Action,
): SessionState => {
  switch (action.type) {
    case SESSION_AUTHENTICATED:
      return {
        ...state,
        processingState: ProcessingState.Ready,
        currentUser: action.data,
      };
    case SESSION_AUTHENTICATION_STARTED:
      return { ...state, processingState: ProcessingState.Loading };
    case SESSION_AUTHENTICATION_FAILED:
      return { ...state, processingState: ProcessingState.Error };
    case SESSION_SIGNED_OUT:
      return {
        ...state,
        processingState: ProcessingState.Ready,
        currentUser: null,
      };
  }
  return state;
};

export default reducer;
