import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import MultiSelect from "../../MultiSelect/MultiSelect";
import style from "./Filters.module.css";

export interface GenericFilter<T = any> {
  column: string | keyof T;
  label: string;
  options: string[] | Record<string, string>;
  multiple?: boolean;
  enabled: boolean;
  width?: string;
}

export interface StatusFilter<T = any> {
  enabled: boolean;
  label?: string;
  column: keyof T | string;
  activeValues: string[];
  inactiveValues: string[];
  activeLabel?: string;
  inactiveLabel?: string;
  allLabel?: string;
  width?: string;
}

interface FiltersProps<T = any> {
  searchable?: boolean;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  dateFrom: Date | null;
  hasDate: boolean;
  onDateFromChange: (date: Date | null) => void;
  dateTo: Date | null;
  onDateToChange: (date: Date | null) => void;
  genericFiltersState: Record<string, string | string[]>;
  onGenericFiltersChange: (filters: Record<string, string | string[]>) => void;
  genericFilters?: GenericFilter<T>[];
  statusFilter?: StatusFilter<T>;
  onFilter: () => void;
  onClearFilters: () => void;
  tableId: string;
  customStyles?: {
    filtersContainer?: React.CSSProperties;
    filtersRow?: React.CSSProperties;
    filterGroup?: React.CSSProperties;
    filterLabel?: React.CSSProperties;
    filterInput?: React.CSSProperties;
    filterButton?: React.CSSProperties;
    clearButton?: React.CSSProperties;
    selectWrapper?: React.CSSProperties;
    dropdown?: React.CSSProperties;
    dropdownOption?: React.CSSProperties;
  };
}

const Filters = <T = any,>({
  searchable = true,
  searchTerm,
  onSearchTermChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  hasDate,
  onDateToChange,
  statusFilter,
  genericFiltersState,
  onGenericFiltersChange,
  genericFilters = [],
  onFilter,
  onClearFilters,
  tableId,
  customStyles = {},
}: FiltersProps<T>) => {
  const isClearDisabled =
    !dateFrom &&
    !dateTo &&
    !searchTerm &&
    Object.keys(genericFiltersState).every((key) => {
      const value = genericFiltersState[key];
      return (
        !value || (Array.isArray(value) && value.length === 0) || value === ""
      );
    });

  if (!searchable) {
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <div
        className={style.inputContainer}
        style={customStyles?.filtersContainer}
      >
        <div className={style.filtersRow} style={customStyles?.filtersRow}>
          {hasDate && (
            <>
              <div
                className={`${style.filterGroup} ${style.calenderContainer}`}
                style={customStyles?.filterGroup}
              >
                <div className={style.filterLabelContainer}>
                  <label
                    className={style.filterLabel}
                    style={customStyles?.filterLabel}
                  >
                    Desde
                  </label>
                  {dateFrom && (
                    <Trash2
                      size={14}
                      className={style.filterTrashIcon}
                      onClick={() => onDateFromChange(null)}
                    />
                  )}
                </div>
                <DatePicker
                  className={style.datePicker}
                  value={dateFrom}
                  onChange={(newValue) =>
                    onDateFromChange(newValue as Date | null)
                  }
                  dayOfWeekFormatter={(weekday) =>
                    format(weekday as Date, "EEEEEE", { locale: ptBR })
                  }
                  desktopModeMediaQuery="(min-width: 0px)"
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      placeholder: "DD/MM/AAAA",
                      inputProps: {
                        placeholder: "DD/MM/AAAA",
                      },
                      sx: {
                        "&.MuiPickersTextField-root": {
                          backgroundColor: "#ffffff",
                          width: "100%",
                          borderRadius: "0.375rem",
                          minWidth: "120px",
                        },
                        "& .MuiPickersInputBase-root": {
                          borderRadius: "0.375rem",
                          height: "2rem",
                          fontSize: "0.875rem",
                          backgroundColor: "none",
                          "& fieldset": {
                            border: "1px solid #d1d5db",
                          },
                          "&:hover fieldset": {
                            borderColor: "#9ca3af",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--id-green-color)",
                            boxShadow: "0 0 0 1px var(--id-green-color)",
                          },
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#6b7280",
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "var(--id-font-family)",
                          fontSize: "0.875rem",
                          "&.Mui-focused": {
                            color: "var(--id-green-color)",
                          },
                        },
                      },
                    },
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "var(--id-green-color) !important",
                          "&:hover": {
                            backgroundColor:
                              "var(--id-green-color-hover) !important",
                          },
                        },
                      },
                    },
                  }}
                />
              </div>

              <div
                className={`${style.filterGroup} ${style.calenderContainer}`}
                style={customStyles?.filterGroup}
              >
                <div className={style.filterLabelContainer}>
                  <label
                    className={style.filterLabel}
                    style={customStyles?.filterLabel}
                  >
                    Até
                  </label>
                  {dateTo && (
                    <Trash2
                      size={14}
                      className={style.filterTrashIcon}
                      onClick={() => onDateToChange(null)}
                    />
                  )}
                </div>
                <DatePicker
                  value={dateTo}
                  onChange={(newValue) =>
                    onDateToChange(newValue as Date | null)
                  }
                  dayOfWeekFormatter={(weekday) =>
                    format(weekday as Date, "EEEEEE", { locale: ptBR })
                  }
                  desktopModeMediaQuery="(min-width: 0px)"
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      placeholder: "DD/MM/AAAA",
                      inputProps: {
                        placeholder: "DD/MM/AAAA",
                      },
                      sx: {
                        "MuiPickersSectionList-root": {
                          color: "var(--text-dark-blue)",
                        },
                        "&.MuiPickersTextField-root": {
                          backgroundColor: "#ffffff",
                          width: "100%",
                          borderRadius: "0.375rem",
                          minWidth: "120px",
                        },
                        "& .MuiPickersInputBase-root": {
                          borderRadius: "0.375rem",
                          height: "2rem",
                          fontSize: "0.875rem",
                          backgroundColor: "none",
                          "& fieldset": {
                            border: "1px solid #d1d5db",
                          },
                          "&:hover fieldset": {
                            borderColor: "#9ca3af",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--id-green-color)",
                            boxShadow: "0 0 0 1px var(--id-green-color)",
                          },
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#6b7280",
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "var(--id-font-family)",
                          fontSize: "0.875rem",
                          "&.Mui-focused": {
                            color: "var(--id-green-color)",
                          },
                        },
                      },
                    },
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "var(--id-green-color) !important",
                          "&:hover": {
                            backgroundColor:
                              "var(--id-green-color-hover) !important",
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </>
          )}
          {genericFilters?.map(
            (filter, index) =>
              filter.enabled && (
                <div
                  key={index}
                  className={style.filterGroup}
                  style={customStyles?.filterGroup}
                >
                  <MultiSelect
                    label={filter.label}
                    options={filter.options}
                    value={
                      genericFiltersState[String(filter.column)] ||
                      (filter.multiple ? [] : "")
                    }
                    onChange={(value) => {
                      const newFilters = { ...genericFiltersState };
                      newFilters[String(filter.column)] = value;
                      onGenericFiltersChange(newFilters);
                    }}
                    placeholder="Todos"
                    multiple={filter.multiple}
                    searchable={true}
                    clearable={true}
                    required={false}
                    minSelection={0}
                    showSelectAll={true}
                    width={filter.width}
                  />
                </div>
              )
          )}

          <div className={style.filterGroup} style={customStyles?.filterGroup}>
            <div className={style.filterLabelContainer}>
              <label
                className={style.filterLabel}
                style={customStyles?.filterLabel}
              >
                Pesquisar
              </label>
              {searchTerm && (
                <Trash2
                  size={14}
                  className={style.filterTrashIcon}
                  onClick={() => onSearchTermChange("")}
                />
              )}
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className={`${style.searchInput}`}
              style={customStyles?.filterInput}
              maxLength={99}
            />
          </div>

          <button
            className={style.filterButton}
            onClick={onFilter}
            style={customStyles?.filterButton}
          >
            Filtrar
          </button>
          <button
            className={`${style.filterButton} ${style.clearButton}`}
            onClick={onClearFilters}
            disabled={isClearDisabled}
            style={customStyles?.clearButton}
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Filters;
