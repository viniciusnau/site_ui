import React from "react";
import styles from "./BoxContainer.module.css";
import { useNavigate } from "react-router-dom";

interface BoxContainerProps {
  title?: string;
  children?: React.ReactNode;
  customStyles?: { [key: string]: string };
  backgroundColor?: string;
  titleColor?: string;
  boxShadow?: string;
  redirectButton?: string; 
  minHeight?: string;
  alignItems?: string;
  justifyContent?: string;
}

const BoxContainer: React.FC<BoxContainerProps> = ({
  title,
  children,
  customStyles = {},
  backgroundColor,
  titleColor,
  boxShadow,
  redirectButton,
  minHeight,
  alignItems,
  justifyContent
}) => {
  const navigate = useNavigate()
  const getClass = (base: string) => {
    const baseClass = styles[base] || "";
    const customClass = customStyles[base] || "";
    return `${baseClass} ${customClass}`.trim();
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    boxShadow,
    minHeight,
    alignItems,
    justifyContent,
  };

  return (
    <section
      className={getClass("boxContainer-container")}
      style={containerStyle}
    >
      <div className={getClass("boxContainer-content")}>
        {(title || redirectButton) && (
          <div className={getClass("boxContainer-header")}>
            {title && (
              <h2
                className={getClass("boxContainer-title")}
                style={{ color: titleColor }}
              >
                {title}
              </h2>
            )}
            {redirectButton && (
              <div className={getClass("boxContainer-action")} onClick={() => navigate(redirectButton)}>
                Ver mais
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default BoxContainer;
