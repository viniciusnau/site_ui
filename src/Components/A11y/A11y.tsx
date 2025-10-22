import styles from "./A11y.module.css";
import Button from "../Forms/Button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleColorInversion } from "../../Services/Slices/a11ySlice";
import { useLocation } from "react-router-dom";
import { PersonStanding, Contrast, AArrowUp, AArrowDown, ALargeSmall, Blend, MousePointer } from 'lucide-react';
interface iA11y {
  setColorInverted: any;
  colorInverted: any;
  setFontSize: any;
  setGrayscale: any;
  grayscale: any;
  setCustomCursor: any;
  mousePosition: any;
  isOpenModal: any;
  setIsOpenModal: any;
}

const A11y: React.FC<iA11y> = ({
                                 setColorInverted,
                                 setFontSize,
                                 setGrayscale,
                                 setCustomCursor,
                                 isOpenModal,
                                 setIsOpenModal,
                               }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isResponsive, setIsResponsive] = useState(false);
  const colorInvertedState = useSelector(
      (state: any) => state.a11ySlice.colorInverted
  );

  const location = useLocation();

  const handleModalClick = (event: any) => {
    event.stopPropagation();
  };

  const handleColorInversion = () => {
    dispatch(toggleColorInversion());
  };

  const handleFontChange = (action: string) => {
    switch (action) {
      case "increase":
        setFontSize((prev: any) => Math.min(prev + 0.25, 2));
        break;
      case "decrease":
        setFontSize((prev: any) => Math.max(prev - 0.25, 0.75));
        break;
      case "reset":
        setFontSize(1);
        break;
    }
  };

  const handleToggleGrayscale = () => {
    setGrayscale((prev: any) => !prev);
  };

  const handleCursorSize = () => {
    setCustomCursor((prev: any) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpenModal(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setIsOpenModal]);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth >= 769);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setColorInverted(colorInvertedState);
  }, [setColorInverted, colorInvertedState]);

  if (location.pathname.includes("viewer")) {
    return null;
  }

  return (
      <div  id="ally">
        {isOpenModal && (
              <Button
                  onClick={(e: any) => {
                    setIsOpenModal(!isOpenModal);
                    handleModalClick(e);
                  }}
                  className={`${styles.a11y} ${styles.button}`}
              >
                <PersonStanding />
              </Button>
        )}
        {!isOpenModal && (
            <div className={styles.controls}>
                <Button
                    className={`${styles.button} ${styles.option}`}
                    onClick={handleColorInversion}
                >
                 <Blend />
                </Button>
                <Button
                    className={`${styles.button} ${styles.option}`}
                    onClick={() => handleFontChange("increase")}
                >
                 <AArrowUp />
                </Button>
                <Button
                    className={`${styles.button} ${styles.option}`}
                    onClick={() => handleFontChange("reset")}
                >
                  <ALargeSmall />
                </Button>
                <Button
                    className={`${styles.button} ${styles.option}`}
                    onClick={() => handleFontChange("decrease")}
                >
                  <AArrowDown />
                </Button>
                <Button
                    className={`${styles.button} ${styles.option}`}
                    onClick={handleToggleGrayscale}
                >
                  <Contrast />
                </Button>
              {isResponsive && (
                    <Button
                        className={`${styles.button} ${styles.option}`}
                        onClick={handleCursorSize}
                    >
                      <MousePointer />
                    </Button>
              )}
            </div>
        )}
      </div>
  );
};

export default A11y;
