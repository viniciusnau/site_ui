import React, { useState } from "react";
import styles from "./Card.module.css";
import { Pencil, Trash, Star, Bookmark } from "lucide-react";

type CardItemProps = {
  id: number;
  href: string;
  target?: string;
  src?: string;
  title: string;
  date?: string;
  className?: string;
  customStyles?: { [key: string]: string };
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onHighlight?: () => void;
  isMain?: boolean;
};

const Card: React.FC<CardItemProps> = ({
  href,
  target,
  src,
  title,
  date,
  customStyles = {},
  isAdmin = false,
  isMain = false,
  onEdit,
  onDelete,
  onHighlight,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const getClass = (base: string) =>
    `${styles[base] || ""} ${customStyles[base] || ""}`.trim();

  const limitTitle = (message: string): string => {
    if (message.length > 155 && !isMain) {
      return message.slice(0, 135) + "...";
    }
    return message;
  };

  return (
    <div className={`${styles.wrapper} ${getClass("wrapperCard")}`}>
      <a
        href={href}
        target={target}
        className={`${styles.container} ${getClass("containerCard")} ${
          isMain ? getClass("containerCardMain") : ""
        }`}
      >
        <div
          className={`${styles.imageContainer} ${getClass(
            "imageContainerCard"
          )} ${isMain ? getClass("imageContainerCardMain") : ""}`}
        >
          {src && (
            <img
              src={src}
              className={`${styles.image} ${getClass("imageCard")} ${
                isMain ? getClass("imageCardMain") : ""
              }`}
              alt={title}
            />
          )}
        </div>
        <div className={`${styles.dateAndTitle} ${getClass("dateAndTitleCard")}`}>
          <div
            className={`${styles.middleContainer} ${getClass(
              "middleContainerCard"
            )}`}
          >
            {date && (
              <div
                className={`${styles.dateContainer} ${getClass(
                  "dateContainerCard"
                )}
                ${isMain ? getClass("dateContainerCardMain") : ""}`}
              >
                <span
                  className={`${styles.date} ${getClass("dateCard")} ${
                    isMain ? getClass("dateCardMain") : ""
                  }`}
                >
                  {date}
                </span>
              </div>
            )}
          </div>
          <div
            className={`${styles.titleContainer} ${getClass(
              "titleContainerCard"
            )} ${isMain ? getClass("titleContainerCardMain") : ""}`}
          >
            <p
              className={`${styles.title} ${getClass("titleCard")} ${
                isMain ? getClass("titleCardMain") : ""
              }`}
            >
              {limitTitle(title)}
            </p>
          </div>
        </div>
      </a>

      {isAdmin && (
        <>
          <div className={styles.adminActions}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsActive((prev) => !prev);
                onHighlight?.();
              }}
              className={`${styles.adminButton} ${
                isActive ? styles.activeHighlightButton : styles.highlightButton
              }`}
              title="Destacar"
            >
              <Star />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit?.();
              }}
              className={`${styles.adminButton} ${styles.editButton}`}
              title="Editar"
            >
              <Pencil />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.();
              }}
              className={`${styles.adminButton} ${styles.deleteButton}`}
              title="Excluir"
            >
              <Trash />
            </button>
          </div>

          <div className={styles.adminActionsBanners}>
            <button className={`${styles.adminBanner}`}>
              <Bookmark
                className={styles.bookmarkIcon}
                data-active={isActive}
              />
            </button>
            <button className={`${styles.adminBanner}`}>
              <Bookmark className={styles.adminBannerIcon} />
            </button>
            <button className={`${styles.adminBanner}`}>
              <Bookmark className={styles.adminBannerIcon} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;