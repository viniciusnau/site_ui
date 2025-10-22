import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Search, Trash2 } from "lucide-react";
import style from "./MultiSelect.module.css";

interface MultiSelectProps {
  options: string[] | Record<string, string>;
  dictionary?: Record<string, string>;
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
  disabled?: boolean;
  width?: string;
  label?: string;
  required?: boolean;
  minSelection?: number;
  maxSelection?: number;
  exactSelection?: number;
  showSelectAll?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  multiple = false,
  searchable = true,
  clearable = false,
  className = "",
  disabled = false,
  width,
  label,
  required = true,
  minSelection = 1,
  maxSelection,
  exactSelection,
  showSelectAll = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsArray = Array.isArray(filteredOptions)
    ? filteredOptions
    : Object.values(filteredOptions);

  const normalizedOptions: { value: string; label: string }[] = Array.isArray(
    options
  )
    ? options.map((opt) => ({ value: opt, label: opt }))
    : Object.entries(options).map(([key, val]) => ({ value: key, label: val }));

  useEffect(() => {
    if (!searchable) {
      setFilteredOptions(options);
      return;
    }

    if (Array.isArray(options)) {
      const filtered = searchTerm
        ? options.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

      setFilteredOptions(filtered);
    } else {
      const filtered = searchTerm
        ? Object.entries(options)
            .filter(([key, value]) =>
              value.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {} as Record<string, string>)
        : options;

      setFilteredOptions(filtered);
    }
  }, [searchTerm, options, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClear = () => {
    if (required || exactSelection) return;

    if (multiple) {
      onChange([]);
    } else {
      onChange("");
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      let newValues: string[];

      if (currentValues.includes(optionValue)) {
        newValues = currentValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...currentValues, optionValue];
      }

      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    } else {
      return value === optionValue;
    }
  };

  const handleSelectAll = () => {
    if (!multiple) return;

    const currentValues = Array.isArray(value) ? value : [];

    if (currentValues.length === normalizedOptions.length) {
      // Tudo selecionado, desmarca tudo
      if (exactSelection) return;
      if (required && minSelection > 0) {
        onChange(normalizedOptions.slice(0, minSelection).map((o) => o.value));
      } else {
        onChange([]);
      }
    } else {
      if (exactSelection) {
        onChange(
          normalizedOptions.slice(0, exactSelection).map((o) => o.value)
        );
      } else if (maxSelection) {
        onChange(normalizedOptions.slice(0, maxSelection).map((o) => o.value));
      } else {
        onChange(normalizedOptions.map((o) => o.value));
      }
    }
  };

  const handleRemoveTag = (optionToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      const currentValues = value;
      if (exactSelection) {
        if (currentValues.length <= exactSelection) {
          return;
        }
      } else if (
        required &&
        currentValues.length <= Math.max(1, minSelection)
      ) {
        return;
      }
      const newValues = value.filter((v) => v !== optionToRemove);
      onChange(newValues);
    }
  };

  const getDisplayText = () => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.length === 0) {
        return placeholder;
      } else if (currentValues.length === normalizedOptions.length) {
        return "Todos";
      } else {
        // Retorna os labels correspondentes aos valores selecionados
        const labels = normalizedOptions
          .filter((opt) => currentValues.includes(opt.value))
          .map((opt) => opt.label);
        return labels.join(", ");
      }
    } else {
      const selectedOption = normalizedOptions.find(
        (opt) => opt.value === value
      );
      return selectedOption ? selectedOption.label : placeholder;
    }
  };

  const currentValues = multiple && Array.isArray(value) ? value : [];
  const allSelected =
    multiple &&
    currentValues.length === normalizedOptions.length &&
    normalizedOptions.length > 0;

  return (
    <div className={style.container} style={{ width }} ref={dropdownRef}>
      {label && (
        <div className={style.labelContainer}>
          <label className={style.label}>
            {label}
            {required && <span className={style.required}>*</span>}
          </label>
          {clearable &&
            !required &&
            !exactSelection &&
            (multiple
              ? Array.isArray(value) && value.length > 0
              : value && value !== "") && (
              <Trash2
                size={14}
                className={style.clearButton}
                onClick={handleClear}
              />
            )}
        </div>
      )}

      <div
        className={`${style.selectButton} ${
          disabled ? style.disabled : ""
        } ${className}`}
        onClick={handleToggle}
      >
        <div className={style.selectedContent}>
          {multiple &&
          Array.isArray(value) &&
          value.length > 0 &&
          value.length < optionsArray.length ? (
            <div className={style.tagsContainer}>
              {value.map((item, index) => (
                <span key={index} className={style.tag}>
                  {item}
                  <X
                    size={12}
                    className={style.removeTag}
                    onClick={(e) => handleRemoveTag(item, e)}
                  />
                </span>
              ))}
            </div>
          ) : (
            <span
              className={`${
                !value || (Array.isArray(value) && value.length === 0)
                  ? style.placeholder
                  : ""
              }`}
            >
              {getDisplayText()}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`${style.selectIcon} ${isOpen ? style.rotated : ""}`}
        />
      </div>

      {isOpen && (
        <div className={style.dropdown}>
          {searchable && (
            <div className={style.searchContainer}>
              <Search size={14} className={style.searchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className={style.optionsContainer}>
            {multiple && showSelectAll && (
              <div
                className={`${style.option} ${
                  allSelected ? style.selected : ""
                }`}
                onClick={handleSelectAll}
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className={style.checkbox}
                />
                Todos
              </div>
            )}

            {filteredOptions.length === 0 ? (
              <div className={style.noOptions}>Nenhuma opção encontrada</div>
            ) : (
              <div className={style.optionsContainer}>
                {normalizedOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className={`${style.option} ${
                      isSelected(opt.value) ? style.selected : ""
                    }`}
                    onClick={() => handleOptionClick(opt.value)}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={isSelected(opt.value)}
                        onChange={() => {}}
                        className={style.checkbox}
                      />
                    )}
                    {opt.label} {/* Aqui mostramos o label */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
