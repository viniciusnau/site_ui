import React from "react";
import styles from "./QuickButton.module.css";

type QuickButtonItemProps = {
  id: number;
  link: string;
  title: string;
  target?: string;
  image: string | React.ReactNode;
  customStyles?: { [key: string]: string };
  background_color?: string;
  title_color?: string; 
  hoverBackgroundColor?: string; 
};

const QuickButton: React.FC<QuickButtonItemProps> = ({
  link,
  title,
  target,
  image,
  customStyles = {},
  background_color,
  title_color,
  hoverBackgroundColor,
}) => {
  const getClass = (base: string) =>
    `${styles[base] || ""} ${customStyles[base] || ""}`.trim();

  const containerStyle: React.CSSProperties = {
    backgroundColor: background_color,
  };

  const linkStyle: React.CSSProperties = {
    color: title_color,
  };

  return (
    <div
      className={`${styles.container} ${getClass("QuickButtonContainer")}`}
      style={containerStyle}
    >
      <a
        href={link}
        target={target}
        className={`${styles.link} ${getClass("QuickButtonLink")}`}
      >
        <div
          className={`${styles.content} ${getClass("QuickButtonContent")}`}
        >
          <div
            className={`${styles.iconContainer} ${getClass(
              "QuickButtonIconContainer"
            )}`}
          >
            {typeof image === "string" ? (
              <img
                src={image}
                alt={title}
                className={`${styles.icon} ${getClass("QuickButtonIcon")}`}
              />
            ) : (
              <span
                className={`${styles.icon} ${getClass("QuickButtonIcon")}`}
              >
                {image}
              </span>
            )}
          </div>
          <div
            className={`${styles.titleContainer} ${getClass(
              "QuickButtonTitleContainer"
            )}`}
          >
            <p className={`${styles.title} ${getClass("QuickButtonTitle")}`} style={linkStyle}>
              {title}
            </p>
          </div>
        </div>
      </a>
      {hoverBackgroundColor && (
        <style>
          {`
            .${getClass("QuickButtonContainer")}:hover {
              background-color: ${hoverBackgroundColor} !important;
            }
          `}
        </style>
      )}
    </div>
  );
};

export default QuickButton;
