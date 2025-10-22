import React, { useState, useEffect } from "react";
import styles from "./Snackbar.module.css";

import { handleTypeService } from "../Consts";

interface iSnackbar {
  type: keyof typeof handleTypeService;
  setSnackbarType?: any;
  customMessage?: string;
}

const Snackbar: React.FC<iSnackbar> = ({ type, setSnackbarType, customMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        if (setSnackbarType) setSnackbarType(null);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible, setSnackbarType]);

  return (
    <div className={styles.snackbarContainer}>
      <div className={`${styles.snackbar} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.title}>
        
          <h3 className={styles.text}>{handleTypeService[type].title}</h3>
        </div>
        <p className={styles.description}>
          {customMessage || handleTypeService[type].description}
        </p>
      </div>
    </div>
  );
};

export default Snackbar;
