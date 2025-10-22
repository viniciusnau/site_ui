import React, { forwardRef } from "react";
import styles from "./Input.module.css";
import { sanitizeInput } from "../Helper";

interface iInput {
  className?: string;
  name?: string;
  value?: any;
  content?: any;
  onClick?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  type?: any;
  placeholder?: string;
  onKeyPress?: any;
  id?: any;
  readOnly?: boolean;
  min?: string;
  max?: number;
  step?: string;
  pattern?: string;
  checked?: boolean;
  onKeyUp?: any;
  defaultValue?: any;
  autoComplete?: string;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; 
}

const Input = forwardRef<HTMLInputElement, iInput>(({
  className = "",
  onClick,
  checked,
  onPaste,
  onKeyDown,
  onChange,
  max,
  autoComplete,
  ...props
}, ref) => { 
  const handleSanitizedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    e.target.value = sanitizedValue;
    if (onChange) onChange(e);
  };

  return (
    <input
      ref={ref}
      className={`${styles.container} ${className}`}
      onClick={onClick}
      checked={checked}
      maxLength={max}
      onPaste={onPaste}
      onChange={handleSanitizedChange}
      onKeyDown={onKeyDown}
      autoComplete={autoComplete}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;