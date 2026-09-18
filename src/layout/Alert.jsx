import { useEffect } from "react";
import styles from "./Alert.module.css";

const Alert = ({ alert, message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!alert || !onClose || duration <= 0) {
      return undefined;
    }

    const timeoutId = setTimeout(onClose, duration);

    return () => clearTimeout(timeoutId);
  }, [alert, duration, onClose]);

  if (!alert) {
    return null;
  }

  return (
    <div
      className={`${styles.alert} ${styles[type] ?? styles.info}`}
      role="alert"
    >
      <p className={styles.message}>{message}</p>
      {onClose && (
        <button
          type="button"
          className={styles.close}
          aria-label="Close alert"
          onClick={onClose}
        >
          x
        </button>
      )}
    </div>
  );
};

export default Alert;
