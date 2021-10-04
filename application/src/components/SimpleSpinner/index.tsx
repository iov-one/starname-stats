import styles from "components/SimpleSpinner/simple-spinner.module.scss";
import React from "react";

export const SimpleSpinner: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.dark} />
        <div className={styles.light} />
      </div>
    </div>
  );
};
