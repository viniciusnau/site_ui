import React from "react";
import styles from "./CardDisplayer.module.css";
type news = {
  id: number;
  href: string;
  target?: string;
  src?: string;
  title: string;
  date?: string;
  icon?: React.ReactNode;
};

interface iNewsletter {
  component: React.ElementType;
  gap?: number;
  content: news[];
  className?: string;
  customStyle?: {};
  isAdmin?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  isMain?: boolean;
  style?: string;
}

const CardDisplayer: React.FC<iNewsletter> = ({
  component: Component,
  content,
  className,
  gap,
  isAdmin,
  onEdit,
  onDelete,
  customStyle,
  isMain,
  style,
}) => {
  return (
    <div className={`${styles.listContainer}` } style={{ gap: `${gap}rem` }}>
      {content.map((item) => (
        <Component
          key={item.id}
          {...item}
          className={className}
          isAdmin={isAdmin}
          onEdit={() => onEdit?.(item.id)}
          onDelete={() => onDelete?.(item.id)}
          customStyles={customStyle}
          isMain={isMain}
          style={{style}}
        />
      ))}
    </div>
  );
};

export default CardDisplayer;