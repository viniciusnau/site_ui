import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  withBackground?: boolean;
  title?: string;
  children: React.ReactNode;
  customStyles?: { [key: string]: string };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  withBackground = true,
  title,
  children,
  customStyles = {},
}) => {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const background = window.getComputedStyle(document.body).backgroundColor;
    const rgb = background.match(/\d+/g)?.map(Number) || [255, 255, 255];
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    setIsDark(brightness < 128);
  }, []);

  const getClass = (base: string) => {
    const baseClass = styles[base] || '';
    const customClass = customStyles[base] || '';
    return `${baseClass} ${customClass}`.trim();
  };
  if (!isOpen) return null;

  return (
    <div className={withBackground ? getClass('overlay') : undefined} onClick={onClose}>
      <div className={getClass('modal')} onClick={(e) => e.stopPropagation()}>
        <div className={getClass('header')}>
          {title && (
            <h2 className={getClass('title')}>
              {title}
            </h2>
          )}
          <div className={getClass('closeButton')} onClick={onClose}>
            <div className={getClass('closeIcon')}>
              <X size={24} className={getClass('invertIcon')}  />
            </div>
          </div>
        </div>
        <div className={getClass('content')}>
          {children}
        </div>
      </div>
    </div>
  );
  
};

export default Modal;
