import DateAdapter from "@date-io/moment";
import { LocalizationProvider } from "@mui/lab";
import { Api, ApiClient } from "api";
import config from "config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebaseApp from "firebaseApp";
import React from "react";
import { Provider } from "react-redux";
import { SESSION_AUTHENTICATED, SESSION_SIGNED_OUT } from "redux/constants";
import store from "redux/store";
import { Routes } from "routes";

const App: React.FC = (): React.ReactElement => {
  React.useEffect((): (() => void) => {
    const auth = getAuth(firebaseApp);
    return onAuthStateChanged(auth, (user: User | null): void => {
      if (user !== null) {
        setTimeout((): void => {
          store.dispatch({ type: SESSION_AUTHENTICATED, data: user });
        }, 400);
      } else {
        setTimeout((): void => {
          store.dispatch({ type: SESSION_SIGNED_OUT });
        }, 400);
      }
    });
  });

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Api.Provider value={new ApiClient(config.apiUrl)}>
          <Routes />
        </Api.Provider>
      </LocalizationProvider>
    </Provider>
  );
};

export default App;
