import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./FilterTypeSelector.module.css";
import { ChevronUp, MoreVertical } from "lucide-react";
import Button from "../../Forms/Button";

export type FilterOption = {
  label: string;
  subOptions?: FilterOption[];
};

interface FilterTypeSelectorProps {
  title?: string;
  content: FilterOption[];
  multiSelect?: boolean;
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  path?: string;
  level?: number;
  onClearAll?: () => void;
  openIndices: number[];
  setOpenIndices: Dispatch<SetStateAction<number[]>>;
}

const FilterTypeSelector: React.FC<FilterTypeSelectorProps> = ({
  title,
  content,
  multiSelect = true,
  selectedOptions,
  onChange,
  path = "",
  level = 0,
  onClearAll,
  openIndices = 0,
  setOpenIndices,
}) => {
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpenIndex !== null && menuRefs.current[menuOpenIndex] && !menuRefs.current[menuOpenIndex]?.contains(event.target as Node)) {
        setMenuOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenIndex]);

  const toggle = (index: number, currentPath: string) => {
    setOpenIndices((prev: number[]) => {
      if (prev.includes(index)) {
        return prev.filter((i: number) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  const handleSelect = (fullLabel: string) => {
    let updated: string[];

    if (multiSelect) {
      updated = selectedOptions.includes(fullLabel)
        ? selectedOptions.filter((o) => o !== fullLabel)
        : [...selectedOptions, fullLabel];
    } else {
      updated = selectedOptions.includes(fullLabel) ? [] : [fullLabel];
    }

    onChange(updated);
  };

  const getAllChildPaths = (option: FilterOption, currentPath: string): string[] => {
    let paths: string[] = [];
    if (option.subOptions) {
      option.subOptions.forEach((subOption, subIndex) => {
        const subPath = `${currentPath} > ${subIndex}_${subOption.label}`;
        paths.push(subPath);
        paths = paths.concat(getAllChildPaths(subOption, subPath));
      });
    }
    return paths;
  };

  const handleClearParentSelection = (item: FilterOption, currentPath: string) => {
    const childrenPaths = getAllChildPaths(item, currentPath);
    const updatedSelected = selectedOptions.filter(
      (option) => !childrenPaths.includes(option) && option !== currentPath
    );
    onChange(updatedSelected);
    setMenuOpenIndex(null);
  };

  const handleSelectAllParentChildren = (item: FilterOption, currentPath: string, index: number) => {
    let childrenPaths = getAllChildPaths(item, currentPath);
    const pathsToSelect = Array.from(new Set([currentPath, ...childrenPaths]));
    const updatedSelected = Array.from(new Set([...selectedOptions, ...pathsToSelect]));
    onChange(updatedSelected);
    setOpenIndices((prev) => (prev.includes(index) ? prev : [...prev, index]));
    setMenuOpenIndex(null);
  };

  return (
    <div className={`${styles.container} ${styles[`level${level}`]}`}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          { selectedOptions.length > 0 && (
            <Button onClick={onClearAll} className={styles.clearAllButton}>
              Limpar Tudo
            </Button>
          )}
        </div>
      )}
      <div className={styles.list}>
        {content.map((item, index) => {
          const hasSub = item.subOptions && item.subOptions.length > 0;
          const isOpen = Array.isArray(openIndices) && openIndices.includes(index);
          const currentPath = path ? `${path} > ${index}_${item.label}` : `${index}_${item.label}`;

          return (
            <div key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <Button
                  onClick={() => (hasSub ? toggle(index, currentPath) : handleSelect(currentPath))}
                  className={`${styles.button} 
                  ${selectedOptions.includes(currentPath) ? styles.selected : ""} 
                  ${hasSub && isOpen ? styles.open : ""} 
                  ${index === 0 ? styles.firstItem : ""}`}
                >
                  {hasSub && (
                    <span
                      className={`${styles.icon} ${
                        Array.isArray(openIndices) && openIndices.includes(index) ? styles.iconOpen : ""
                      }`}
                    >
                      <ChevronUp />
                    </span>
                  )}
                  {item.label}
                  {hasSub && (
                    <div
                      className={styles.moreVerticalContainer}
                      ref={(el) => { menuRefs.current[index] = el; }} 
                    >
                      <MoreVertical
                        size={18}
                        className={styles.moreVerticalIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenIndex(menuOpenIndex === index ? null : index);
                        }}
                      />
                      {menuOpenIndex === index && (
                        <div className={styles.dropdownMenu}>
                          <Button
                            className={styles.clearButton}
                            onClick={() => handleClearParentSelection(item, currentPath)}
                          >
                            Limpar seleção
                          </Button>
                          <Button
                            className={styles.selectAllButton}
                            onClick={(e: any) => {
                              e.stopPropagation();
                              handleSelectAllParentChildren(item, currentPath, index);
                            }}
                          >
                            Selecionar todos
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Button>
              </div>
              {hasSub && isOpen && item.subOptions && (
                <div className={`${styles.subOptionsWrapper} ${isOpen ? styles.open : ""}`}>
                  <div className={styles.subOptions}>
                    <FilterTypeSelector
                      content={item.subOptions}
                      multiSelect={multiSelect}
                      selectedOptions={selectedOptions}
                      onChange={onChange}
                      level={level}
                      path={currentPath}
                      openIndices={openIndices}
                      setOpenIndices={setOpenIndices}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterTypeSelector;