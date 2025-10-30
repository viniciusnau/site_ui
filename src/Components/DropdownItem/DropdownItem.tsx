import React, { useEffect, useRef } from "react";
import defaultStyles from "./DropdownItem.module.css";
import { ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  path?: string;
  link?: string;
  page?: string;
  type: "internal" | "external" | "path";
  children: MenuItem[];
  icon?: any;
}

interface Props {
  item: MenuItem;
  keyPath: string;
  isOpen: boolean;
  isActiveAncestor: boolean;
  isDesktop: boolean;
  toggleDropdown: (key: string) => void;
  renderMenuItems: (items: MenuItem[], parentKey: string, nameColor: string) => React.ReactNode;
  customStyles?: { [key: string]: string };
  nameColor?: string;
}

const DropdownItem: React.FC<Props> = ({
  item,
  keyPath,
  isOpen,
  isActiveAncestor,
  isDesktop,
  toggleDropdown,
  renderMenuItems,
  customStyles = {},
  nameColor,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    if (ref.current) {
      if (isDesktop) {
        ref.current.style.maxHeight = isOpen
          ? `${ref.current.scrollHeight}px`
          : "";
      } else {
        ref.current.style.maxHeight = isOpen
          ? `${ref.current.scrollHeight}px`
          : "0px";
      }
    }
  }, [isOpen, isDesktop]);

  const getClass = (base: string) =>
    `${defaultStyles[base] || ""} ${customStyles[base] || ""}`.trim();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (hasChildren) {
      toggleDropdown(keyPath);
    }

    if (item.type === "internal" && item.page) {
      navigate(item.page);
    } else if (item.type === "external" && item.link) {
      window.open(item.link, "_blank");
    } else if (item.type === "path") {

    }
  };

  return (
    <div className={getClass("menuItemWrapper")}>
      <div
        className={`${getClass("menuItem")} ${
          isActiveAncestor ? getClass("activeAncestor") : ""
        }`}
        onClick={handleClick}
      >
        <div className={getClass("menuItemWithIcon")}>
          {item.icon && (
            <item.icon size={16} className={getClass("menuIcon")} />
          )}
          <span className={getClass("label")} style={{ color: nameColor }}>{item.name}</span>

          {hasChildren && (
            <ChevronUp
              size={16}
              className={`${getClass("dropdownIcon")} ${
                isOpen ? getClass("rotated") : ""
              }`}
            />
          )}
        </div>
      </div>

      {hasChildren && (
        <div
          ref={ref}
          className={
            isDesktop
              ? `${getClass("dropdown")} ${
                  isOpen ? getClass("dropdownOpen") : ""
                }`
              : `${getClass("dropdownClick")} ${
                  isOpen ? getClass("dropdownClickOpen") : ""
                }`
          }
        >
          {renderMenuItems(item.children, keyPath, nameColor || "")}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
