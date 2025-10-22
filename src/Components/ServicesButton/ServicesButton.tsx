import React from "react";
import styles from "./ServicesButton.module.css";

type ServicesButtonItemProps = {
  id: number;
  link: string;
  title: string;
  title_color?: string;
  target?: string;
  image: string | React.ReactNode;
  customStyles?: { [key: string]: string };
  color?: string;
  width?: string;
  height?: string;
};

const ServicesButton: React.FC<ServicesButtonItemProps> = ({
  link,
  title,
  title_color,
  target,
  image,
  customStyles = {},
  color,
  height = "300px",
  width = "360px",
}) => {
  const getClass = (base: string) =>
    `${styles[base] || ""} ${customStyles[base] || ""}`.trim();

  const containerStyle: React.CSSProperties = {
    color,
    width,
    height,
  };

  const linkStyle: React.CSSProperties = {
    color,
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
        style={linkStyle}
      >
        <div className={`${styles.content} ${getClass("QuickButtonContent")}`}>
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
              <span className={`${styles.icon} ${getClass("QuickButtonIcon")}`}>
                {image}
              </span>
            )}
          </div>
          <div
            className={`${styles.titleContainer} ${getClass(
              "QuickButtonTitleContainer"
            )}`}
          ></div>
        </div>
        <p className={`${styles.title} ${getClass("QuickButtonTitle")}`} style={{color: title_color}}>
          {title}
        </p>
      </a>
    </div>
  );
};

export default ServicesButton;
