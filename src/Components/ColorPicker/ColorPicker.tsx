import React, { useState } from "react";
import { Colorful } from "@uiw/react-color";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = e.target.value;
    if (!newColor.startsWith("#")) newColor = "#" + newColor;
    onChange(newColor);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div
          style={{
            width: 50,
            height: 25,
            borderRadius: 4,
            border: "1px solid #ccc",
            backgroundColor: value,
            cursor: "pointer",
          }}
          onClick={() => setOpen((prev) => !prev)}
        />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          maxLength={7}
          style={{
            width: 80,
            fontSize: 12,
            padding: "4px 6px",
            borderRadius: 4,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      </div>
      {open && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Colorful
            color={value}
            disableAlpha
            onChange={(color) => onChange(color.hex)}
          />
        </div>
      )}
    </>
  );
};

export default ColorPicker;
