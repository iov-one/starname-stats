import { DateRangeView } from "components/Home/DateRangeView";
import styles from "components/Home/home.module.scss";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "firebaseApp";
import React from "react";

export const Home: React.FC = (): React.ReactElement => {
  const onLogOut = (): void => {
    // FIXME: do this using an action
    const auth = getAuth(firebaseApp);
    signOut(auth);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button className={styles.logout} onClick={onLogOut}>
          Logout
        </button>
      </div>
      <DateRangeView />
    </div>
  );
};
