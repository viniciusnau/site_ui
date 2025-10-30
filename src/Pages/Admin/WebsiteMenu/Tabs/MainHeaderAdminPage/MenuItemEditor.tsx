import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Trash2,
  Plus,
} from "lucide-react";
import { useDrag, useDrop } from "react-dnd";
import { MenuItem } from "../../../../../Services/interfaces";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ITEM_TYPE = "MENU_ITEM";

const MenuItemEditor = ({
  styles,
  item,
  index,
  onUpdate,
  onDelete,
  onMove,
  level = 0,
  width = 100,
}: any) => {
  const data = useSelector((state: any) => state.pagesSlice.data);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<any | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  const getClass = (base: string) => {
    const baseClass = styles[base] || "";
    return `${baseClass}`.trim();
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: { item, index, level },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [localDropPosition, setLocalDropPosition] = useState<
    "above" | "below" | "inside" | null
  >(null);

  const [{ isOver }, dropRef] = useDrop({
    accept: ITEM_TYPE,
    hover(dragged: any, monitor) {
      if (!ref.current) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      let newPosition: "above" | "below" | "inside" | null = null;

      const insideThreshold = hoverBoundingRect.width * 0.85;
      if (
        hoverClientY < hoverMiddleY &&
        hoverClientX < hoverBoundingRect.width - insideThreshold
      ) {
        newPosition = "above";
      } else if (
        hoverClientY > hoverMiddleY &&
        hoverClientX < hoverBoundingRect.width - insideThreshold
      ) {
        newPosition = "below";
      } else if (hoverClientX >= hoverBoundingRect.width - insideThreshold) {
        newPosition = "inside";
      }

      const draggedItem = monitor.getItem();
      draggedItem.dropTarget = item;
      draggedItem.dropPosition = newPosition;

      if (newPosition !== localDropPosition) setLocalDropPosition(newPosition);
    },
    drop(dragged: any) {
      if (!dragged.dropTarget || dragged.item.uid === dragged.dropTarget.uid)
        return;

      onMove(dragged.item, dragged.dropTarget, dragged.dropPosition);
      setLocalDropPosition(null);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  dragRef(dropRef(ref));

  const handleFieldChange = (field: string, value: any) => {
    onUpdate({ ...item, [field]: value });
  };

  const handleAddChild = () => {
    const newChild: MenuItem = {
      name: "Novo Item",
      type: "path",
      page: "",
      children: [],
    };
    onUpdate({ ...item, children: [...item.children, newChild] });
  };

  const handleUpdateChild = (childIndex: number, updatedChild: MenuItem) => {
    const newChildren = [...item.children];
    newChildren[childIndex] = updatedChild;
    onUpdate({ ...item, children: newChildren });
  };

  const handleDeleteChild = (childIndex: number) => {
    const newChildren = item.children.filter(
      (_: any, i: number) => i !== childIndex
    );
    onUpdate({ ...item, children: newChildren });
  };

  const getLinkField = () => {
    switch (item.type) {
      case "internal":
        return (
          <Autocomplete
            value={data.find((page: any) => page.id === item.page) || null}
            onChange={(event: any, newValue: any) => {
              setValue(newValue);
              handleFieldChange("page", newValue ? newValue.id : null);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="page-selector"
            options={data}
            getOptionLabel={(option) => option?.title || ""}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                backgroundColor: "#fff",
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#3ed219ff" },
                "&.Mui-focused fieldset": {
                  borderColor: "#37c414ff",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#555",
                fontWeight: 500,
              },
              "& .MuiAutocomplete-listbox": {
                backgroundColor: "#fafafa",
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="Selecione a página" />
            )}
          />
        );
      case "external":
        return (
          <input
            type="url"
            placeholder="https://exemplo.com"
            value={item.link || ""}
            onChange={(e) => handleFieldChange("link", e.target.value)}
            className={getClass("input")}
          />
        );
      default:
        return null;
    }
  };

  const isInside = isOver && localDropPosition === "inside";

  let dropStyle: React.CSSProperties = {};

  if (isInside) {
    dropStyle = {
      border: "2px solid rgba(245, 158, 11, 0.6)",
      borderTop: "none",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      transition: "all 0.3s ease-in-out",
      marginBottom: "83px",
    };
  } else if (isOver && localDropPosition === "above") {
    dropStyle = {
      borderTop: "solid 2px rgba(79, 70, 229, 0.6)",
      backgroundColor: "transparent",
      transition: "all 0.2s ease-in-out",
      paddingTop: "10px",
    };
  } else if (isOver && localDropPosition === "below") {
    dropStyle = {
      borderBottom: "solid 2px rgba(34, 197, 94, 0.6)",
      backgroundColor: "transparent",
      transition: "all 0.2s ease-in-out",
      paddingBottom: "10px",
    };
  } else {
    dropStyle = {
      border: "none",
      backgroundColor: "transparent",
    };
  }

  return (
    <div
      ref={ref}
      className={getClass("editorContainer")}
      style={{
        width: `${width - 2}%`,
        opacity: isDragging ? 0.4 : 1,
        marginRight: isInside ? `${level + 20 - 4 * level}px` : 0,
        transition: "all 0.2s ease",
        ...dropStyle,
      }}
    >
      <div className={getClass("editorContent")}>
        <div className={getClass("editorCard")}>
          <GripVertical size={16} className={getClass("grip")} />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={getClass("card")}
          >
            {item.children.length > 0 ? (
              isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )
            ) : (
              <div className="w-4" />
            )}
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={getClass("buttonCard")}
          >
            {item.name}
          </button>

          <span className={getClass("type")}>
            {item.type === "internal"
              ? "Página Interna"
              : item.type === "external"
              ? "Link Externo"
              : "Vazio"}
          </span>
          <div className={getClass("buttonGroup")}>
            <button
              onClick={handleAddChild}
              className={getClass("button")}
              title="Adicionar filho"
            >
              <Plus size={16} style={{ marginRight: 6 }} /> Adicionar sub menu
            </button>
            <button
              onClick={() => onDelete(index)}
              className={`${getClass("button")} ${getClass("cancel")}`}
              title="Deletar"
            >
              <Trash2 size={16} style={{ marginRight: 6 }} /> Remover
            </button>
          </div>
        </div>

        {isEditing && (
          <div className={getClass("editingContainer")}>
            <div className={getClass("inputContainer")}>
              <label className={getClass("label")}>Nome do Menu</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                className={getClass("input")}
              />
            </div>

            <div className={getClass("inputContainer")}>
              <label className={getClass("label")}>Tipo</label>
              <select
                value={item.type}
                onChange={(e) => handleFieldChange("type", e.target.value)}
                className={getClass("input")}
              >
                <option value="path">Vazio</option>
                <option value="internal">Página interna</option>
                <option value="external">Link externo</option>
              </select>
            </div>

            {item.type !== "path" && (
              <div className={getClass("inputContainer")}>
                <label className={getClass("label")}>
                  {item.type === "internal" ? "Página Interna" : "Link Externo"}
                </label>
                {getLinkField()}
              </div>
            )}
          </div>
        )}
      </div>

      {isExpanded && item.children.length > 0 && (
        <div className={getClass("children")}>
          {item.children.map((child: MenuItem, childIndex: number) => (
            <MenuItemEditor
              styles={styles}
              key={childIndex}
              item={child}
              index={childIndex}
              onUpdate={(updated: MenuItem) =>
                handleUpdateChild(childIndex, updated)
              }
              onDelete={(idx: number) => handleDeleteChild(idx)}
              onMove={onMove}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemEditor;
