import React, { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  visibleItems?: number;
  maxItems?: number;
  width?: string;
  onEndReached?: () => void;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  visibleItems = 1,
  maxItems = 20,
  width = "100%",
  onEndReached
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + visibleItems >= Math.min(children.length, maxItems);
  const hideArrows = isPrevDisabled && isNextDisabled;


  const visible = children.slice(startIndex, startIndex + visibleItems);

  const handleNext = () => {
    if (startIndex + visibleItems < Math.min(children.length, maxItems)) {
      setStartIndex(prev => prev + 1);
    } else if (onEndReached) {
      onEndReached();
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  return (
    <div className={styles.carouselContainer} style={{ width }}>
      {!hideArrows && (
        <button className={styles.navButton} onClick={handlePrev} disabled={isPrevDisabled}>
          <ChevronLeft size={24} />
        </button>
      )}
  
      <div className={styles.itemsContainer} ref={containerRef}>
        <div
          className={styles.itemsWrapper}
          style={{
            transform: `translateX(-${startIndex * (100 / visibleItems)}%)`,
            width: `${(children.length * 100) / visibleItems}%`,
          }}
        >
          {children.map((child, index) => (
            <div className={styles.item} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
  
      {!hideArrows && (
        <button className={styles.navButton} onClick={handleNext} disabled={isNextDisabled}>
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );  
};

export default Carousel;
