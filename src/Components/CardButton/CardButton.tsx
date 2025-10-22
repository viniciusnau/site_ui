import React from "react";
import styles from "./CardButton.module.css";
import { Download, Eye } from "lucide-react";
import { useIsResponsive } from "../Helper";

type CardButtonContent = {
  description?: string;
  view?: boolean;
  download?: boolean;
  file?: {
    name: string;
    type?: string;
    url: string;
  };
  date?: string;
  seeMore?: boolean;
  link?: string;
};

interface iCardButton {
  title: string;
  content?: CardButtonContent[];
}

type CardButtonProps =
  | { cards: iCardButton[]; title?: never; content?: never }
  | { title: string; content?: CardButtonContent[]; cards?: never };

const CardButton: React.FC<CardButtonProps> = (props) => {
  const isResponsive = useIsResponsive(700)
  const iconSize = isResponsive ? 22 : 28;
  const handleView = (fileUrl?: string) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const handleDownload = (file?: { url: string; name?: string }) => {
    if (file?.url) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name || "arquivo";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (Array.isArray((props as { cards: iCardButton[] }).cards)) {
    const { cards } = props as { cards: iCardButton[] };
    return (
      <>
        {cards.map((card, idx) => (
          <CardButton key={idx} title={card.title} content={card.content} />
        ))}
      </>
    );
  }

  return (
    <div className={styles.container} id="CardButton">
      {props.content?.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.containerText}>
            <h2 className={styles.title}>{props.title}</h2>
            {item.date && <span className={styles.date}>{item.date}</span>}
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
          </div>
          {!item.file && item.seeMore && (
            <div className={styles.containerButtons}>
              <button 
                onClick={() => handleView(item.link)}
                className={styles.button} >Ver mais</button>
            </div>
          )}
          {item.file &&(
            <div className={styles.containerButtons}>
              {item.view && (
                <button
                onClick={() => handleView(item.file?.url)}
                className={styles.button}
                >
                  <Eye size={iconSize}/>
                  Visualizar
                </button>
              )}
              {item.download && (
                <button
                  onClick={() => handleDownload(item.file)}
                  className={styles.button}
                >
                  <Download size={iconSize}/>
                  Download
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardButton;
