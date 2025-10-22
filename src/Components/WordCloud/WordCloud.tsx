import React, { useEffect, useRef, useState } from "react";
import cloud from "d3-cloud";
import { useNavigate } from "react-router-dom";
import styles from "./WordCloud.module.css";

type Word = {
  word: string;
  count: number;
  to?: string;
};

interface iWord {
  title?: string;
  content: Word[];
  width?: number;
  height?: number;
}

interface PositionedWord {
  text: string;
  size: number;
  x: number;
  y: number;
  rotate: number;
  to?: string;
  colorClass: string;
}

const WordCloud: React.FC<iWord> = ({
  title,
  content,
  width = 500,
  height = 356.817,
}) => {
  const [words, setWords] = useState<PositionedWord[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();
  const colors = ["redColorDPE", "greenColorDPE"];
  const [isResponsive, setIsResponsive] = useState(false);
  const svgWidth = isResponsive ? 300 : width;
  const svgHeight = isResponsive ? 300 : height;
  const minFont = isResponsive ? 12 : 15;
  const maxFont = isResponsive ? 26 : 33;

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 1600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    const counts = content.map((w) => w.count);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);

    const layout = cloud()
      .size([svgWidth, svgHeight])
      .words(
        content.map((w) => ({
          text: w.word,
          size:
            maxCount == minCount
              ? (minFont + maxFont) / 2
              : minFont +
                ((w.count - minCount) / (maxCount - minCount)) *
                  (maxFont - minFont),
          to: w.to,
        }))
      )
      .padding(5)
      .rotate(() => Math.floor(Math.random() * 21) - 10)
      .font("lato")
      .fontSize((d: any) => d.size)
      .on("end", (drawnWords) => {
        const drawnWordsWithColor = drawnWords.map((word, i) => ({
          ...word,
          colorClass: colors[i % colors.length],
        }));
        setWords(drawnWordsWithColor as PositionedWord[]);
      });

    layout.start();
  }, [content, width, height, isResponsive]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <svg ref={svgRef} width={svgWidth} height={svgHeight}>
          <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
            {words.map((word, i) => (
              <text
                key={i}
                transform={`translate(${word.x}, ${word.y}) rotate(${
                  word.rotate
                }) scale(${hoveredIndex === i ? 1.2 : 1})`}
                textAnchor="middle"
                className={`${styles.text} ${styles[word.colorClass]}`}
                style={{
                  fontSize: word.size,
                  cursor: word.to ? "pointer" : "default",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => word.to && navigate(word.to)}
              >
                {word.text}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WordCloud;
