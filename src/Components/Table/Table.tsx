import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  X,
  Check,
  Eye,
  Pencil,
  Trash2,
  PlusCircle,
  Timer,
} from "lucide-react";
import { TableProps, BooleanColumnConfig } from "../../types/tableTypes";
import style from "./Table.module.css";
import { useIsResponsive } from "../Helper";
import SelectedList from "../SelectedList/SelectedList";
import { optionsCargo, optionsStatus } from "../Helper";
import Modal from "../Modal/Modal";
import Filters from "./Filters/Filters";
import Tooltips from "../Tooltip/Tooltip";

function Table<T extends Record<string, any>>({
  data,
  columns,
  onDelete,
  createButton,
  loading = false,
  searchable = true,
  sortable = true,
  pagination = true,
  hasSearchDate = false,
  itemsPerPage = 5,
  booleanColumn,
  booleanColumns,
  dateColumn,
  actionsColumn,
  onDateFilter,
  onSearchFilter,
  onSort,
  genericFilters = [],
  onGenericFilter,
  customStyles = {},
}: TableProps<T>) {
  const tableId = React.useId();

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [genericFiltersState, setGenericFiltersState] = useState<
    Record<string, string | string[]>
  >({});
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [deleteConfirmMessage, setDeleteConfirmMessage] = useState("");

  const handleFilter = () => {
    if (onDateFilter) {
      onDateFilter(dateFrom, dateTo);
    }
    if (onSearchFilter) {
      onSearchFilter(searchTerm);
    }
    if (onGenericFilter) {
      onGenericFilter(genericFiltersState);
    }
    setCurrentPage(1);
  };

  const handleDeleteClick = (item: T) => {
    const customMessage =
      actionsColumn?.delete?.confirmMessage ||
      "Você tem certeza que quer excluir esse item?";
    setItemToDelete(item);
    setDeleteConfirmMessage(customMessage);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (actionsColumn?.delete?.onClick) {
        actionsColumn.delete.onClick(itemToDelete);
      } else {
        onDelete?.(itemToDelete.id);
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  useEffect(() => {
    if (!onDateFilter && !onSearchFilter && !onGenericFilter) {
      setCurrentPage(1);
    }
  }, [
    dateFrom,
    dateTo,
    searchTerm,
    genericFiltersState,
    onDateFilter,
    onSearchFilter,
    onGenericFilter,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${style.selectWrapper}`)) {
        const genericDropdowns = Array.from(
          document.querySelectorAll(`[id^="${tableId}-dropdown"]`)
        );
        const allDropdowns = [...genericDropdowns];

        allDropdowns.forEach((dropdown) => {
          (dropdown as HTMLElement).style.display = "none";
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tableId]);

  const filteredData = data.filter((item) => {
    if (onDateFilter || onSearchFilter || onGenericFilter) {
      return true;
    }

    const textMatch = searchable
      ? Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    let dateMatch = true;
    if (dateColumn?.enabled && (dateFrom || dateTo)) {
      let itemDate;

      if (dateColumn.startDateField && dateColumn.endDateField) {
        const startDate = item[dateColumn.startDateField];
        const endDate = item[dateColumn.endDateField];

        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);

          if (dateFrom && end < dateFrom) {
            dateMatch = false;
          }
          if (dateTo && start > dateTo) {
            dateMatch = false;
          }
        }
      } else {
        itemDate = item[dateColumn.dateField];
        if (itemDate) {
          const date = new Date(itemDate);
          if (dateFrom && date < dateFrom) {
            dateMatch = false;
          }
          if (dateTo && date > dateTo) {
            dateMatch = false;
          }
        }
      }
    }

    let genericMatch = true;

    if (genericFilters && genericFilters.length > 0) {
      for (const filter of genericFilters) {
        if (filter.enabled) {
          const filterValue = genericFiltersState[String(filter.column)];

          if (filterValue) {
            const itemValue = item[filter.column];

            if (filter.multiple && Array.isArray(filterValue)) {
              if (filterValue.length > 0) {
                let found = false;

                if (Array.isArray(itemValue)) {
                  found = filterValue.some((fv) => itemValue.includes(fv));
                } else {
                  found = filterValue.includes(String(itemValue));
                }

                if (!found) {
                  genericMatch = false;
                  break;
                }
              }
            } else if (
              !filter.multiple &&
              typeof filterValue === "string" &&
              filterValue !== ""
            ) {
              if (Array.isArray(itemValue)) {
                if (!itemValue.includes(filterValue)) {
                  genericMatch = false;
                  break;
                }
              } else {
                if (String(itemValue) !== filterValue) {
                  genericMatch = false;
                  break;
                }
              }
            }
          }
        }
      }
    }

    return textMatch && dateMatch && genericMatch;
  });

  const sortedData = React.useMemo(() => {
    if (onSort) {
      return filteredData;
    }

    if (!sortConfig || !sortable) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue: any = null;
      let bValue: any = null;

      if (String(sortConfig.key).startsWith("__")) {
        if (sortConfig.key === "__boolean" && booleanColumn?.enabled) {
          const checkValues = Array.isArray(booleanColumn.checkValue)
            ? booleanColumn.checkValue
            : [
                booleanColumn.checkValue !== undefined
                  ? booleanColumn.checkValue
                  : true,
              ];
          aValue = checkValues.includes(a[booleanColumn.field]) ? 1 : 0;
          bValue = checkValues.includes(b[booleanColumn.field]) ? 1 : 0;
        } else if (
          String(sortConfig.key).startsWith("__boolean_") &&
          booleanColumns
        ) {
          const boolIndex = parseInt(
            String(sortConfig.key).replace("__boolean_", "")
          );
          const boolConfig = booleanColumns[boolIndex];
          if (boolConfig?.enabled) {
            const checkValues = Array.isArray(boolConfig.checkValue)
              ? boolConfig.checkValue
              : [
                  boolConfig.checkValue !== undefined
                    ? boolConfig.checkValue
                    : true,
                ];
            aValue = checkValues.includes(a[boolConfig.field]) ? 1 : 0;
            bValue = checkValues.includes(b[boolConfig.field]) ? 1 : 0;
          }
        } else if (sortConfig.key === "__date" && dateColumn?.enabled) {
          aValue = a[dateColumn.dateField]
            ? new Date(a[dateColumn.dateField]).getTime()
            : 0;
          bValue = b[dateColumn.dateField]
            ? new Date(b[dateColumn.dateField]).getTime()
            : 0;
        } else if (
          sortConfig.key === "__startDate" &&
          dateColumn?.enabled &&
          dateColumn.startDateField
        ) {
          aValue = a[dateColumn.startDateField]
            ? new Date(a[dateColumn.startDateField]).getTime()
            : 0;
          bValue = b[dateColumn.startDateField]
            ? new Date(b[dateColumn.startDateField]).getTime()
            : 0;
        } else if (
          sortConfig.key === "__endDate" &&
          dateColumn?.enabled &&
          dateColumn.endDateField
        ) {
          aValue = a[dateColumn.endDateField]
            ? new Date(a[dateColumn.endDateField]).getTime()
            : 0;
          bValue = b[dateColumn.endDateField]
            ? new Date(b[dateColumn.endDateField]).getTime()
            : 0;
        }
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [
    filteredData,
    sortConfig,
    sortable,
    onSort,
    booleanColumn,
    booleanColumns,
    dateColumn,
  ]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + itemsPerPage)
    : sortedData;
  const isMobile = useIsResponsive(1100);
  const iconSize = isMobile ? 22 : 26;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form, setForm] = useState<Record<string, any>>({
    name: "",
    email: "",
    role: [] as string[],
    status: "",
  });
  const [editingRowId, setEditingRowId] = useState<number | string | null>(
    null
  );
  const [editedRowData, setEditedRowData] = useState<Record<string, any>>({});

  const handleEdit = (item: T) => {
    setEditingRowId(item.id);
    setEditedRowData({ ...item });
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [sortedData.length, totalPages, currentPage]);

  const handleFieldChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setEditedRowData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const optionsMap: Record<string, string[]> = {
    role: optionsCargo,
    status: optionsStatus,
  };

  const handleSort = (key: keyof T | string) => {
    if (!sortable) return;

    setSortConfig((current) => {
      const direction: "asc" | "desc" =
        current && current.key === key && current.direction === "asc"
          ? "desc"
          : "asc";
      const newConfig = { key, direction };

      if (onSort) {
        onSort(String(newConfig.key), newConfig.direction);
      }

      return newConfig;
    });
  };

  const getNestedValue = (obj: any, path: string) => {
    try {
      const result = path
        .split(".")
        .reduce((current, key) => current?.[key], obj);

      if (result === null || result === undefined) {
        return "-";
      }

      if (Array.isArray(result)) {
        return result.length > 0 ? result.join(", ") : "-";
      }

      return String(result);
    } catch (error) {
      return "-";
    }
  };

  const handleStatusChange = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      status: checked ? "active" : "inactive",
    }));
  };

  const renderBooleanColumn = (item: T, config: BooleanColumnConfig<T>) => {
    if (!config?.enabled) return null;

    try {
      const fieldValue = item[config.field];
      const checkValues = Array.isArray(config.checkValue)
        ? config.checkValue
        : [config.checkValue !== undefined ? config.checkValue : true];
      const xValues = Array.isArray(config.xValue)
        ? config.xValue
        : [config.xValue !== undefined ? config.xValue : false];
      
      const scheduleValues = Array.isArray(config.scheduledValue)
        ? config.scheduledValue
        : [config.scheduledValue !== undefined ? config.scheduledValue : "schedule"]; 

      const shouldShowCheck = checkValues.includes(fieldValue);
      const shouldShowX = xValues.includes(fieldValue);
      const shouldShowSchedule = scheduleValues.includes(fieldValue);

      if (shouldShowCheck) {
        return (
          <div
            className={style.statusContainer}
            style={customStyles?.statusContainer}
          >
            <Check size={iconSize} className={style.statusCheck} />
          </div>
        );
      } else if (shouldShowX) {
        return (
          <div
            className={style.statusContainer}
            style={customStyles?.statusContainer}
          >
            <X size={iconSize} className={style.statusX} />
          </div>
        );
      }else if (shouldShowSchedule) {
      return (
        <div className={style.statusContainer} style={customStyles?.statusContainer}>
          <Timer size={iconSize} className={style.statusSchedule} />
        </div>
      );
    }else {
        return (
          <div
            className={style.statusContainer}
            style={customStyles?.statusContainer}
          >
            <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>-</span>
          </div>
        );
      }
    } catch (error) {
      return (
        <div
          className={style.statusContainer}
          style={customStyles?.statusContainer}
        >
          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>-</span>
        </div>
      );
    }
  };

  const renderDateColumn = (item: T) => {
    if (!dateColumn?.enabled) return null;

    try {
      const mainDate = item[dateColumn.dateField];

      const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            return "Data inválida";
          }
          return date.toLocaleDateString("pt-BR");
        } catch (error) {
          return "Data inválida";
        }
      };

      return (
        <div
          className={style.dateContainer}
          style={customStyles?.dateContainer}
        >
          <div className={style.dateMain}>
            {mainDate ? formatDate(mainDate) : "N/A"}
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div
          className={style.dateContainer}
          style={customStyles?.dateContainer}
        >
          <div className={style.dateMain}>
            <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>Erro</span>
          </div>
        </div>
      );
    }
  };

  const renderStartDateColumn = (item: T) => {
    if (!dateColumn?.enabled || !dateColumn.startDateField) return null;

    try {
      const startDate = item[dateColumn.startDateField];

      const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            return "Data inválida";
          }
          return date.toLocaleDateString("pt-BR");
        } catch (error) {
          return "Data inválida";
        }
      };

      return (
        <div
          className={style.dateContainer}
          style={customStyles?.dateContainer}
        >
          <div className={style.dateMain}>
            {startDate ? formatDate(startDate) : "N/A"}
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div
          className={style.dateContainer}
          style={customStyles?.dateContainer}
        >
          <div className={style.dateMain}>
            <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>Erro</span>
          </div>
        </div>
      );
    }
  };

  const renderEndDateColumn = (item: T) => {
    if (!dateColumn?.enabled || !dateColumn.endDateField) return null;

    try {
      const endDate = item[dateColumn.endDateField];

      const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            return "Data inválida";
          }
          return date.toLocaleDateString("pt-BR");
        } catch (error) {
          return "Data inválida";
        }
      };

      const isExpired = () => {
        if (!endDate) return true;
        try {
          const today = new Date();
          const end = new Date(endDate);
          if (isNaN(end.getTime())) return true;
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return end < tomorrow;
        } catch (error) {
          return true;
        }
      };

      const expired = isExpired();

      return (
        <div
          className={style.dateContainer}
          style={customStyles?.dateContainer}
        >
          {endDate ? (
            expired ? (
              <>
                <div className={style.dateMain}>{formatDate(endDate)}</div>
                <div className={`${style.dateEnd} ${style.dateExpired}`}>
                  Expirou
                </div>
              </>
            ) : (
              <div className={style.dateMain}>{formatDate(endDate)}</div>
            )
          ) : (
            <div className={`${style.dateMain} ${style.dateExpired}`}>
              Sem Data Final
            </div>
          )}
        </div>
      );
    } catch (error) {
      return (
        <div
          className={style.dateContainer}
          style={customStyles?.dateContainer}
        >
          <div className={style.dateMain}>
            <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>Erro</span>
          </div>
        </div>
      );
    }
  };

  const renderActionsColumn = (item: T) => {
    if (!actionsColumn?.enabled) return null;

    const permissions = actionsColumn.permissions || {};
    const hasAnyPermission =
        permissions.canView || permissions.canEdit || permissions.canDelete;

    if (!hasAnyPermission) return null;

    const isEnabled = (value?: boolean | ((row: T) => boolean)) =>
        typeof value === "function" ? value(item) : value !== false;

    return (
        <div
            className={style.actionsContainer}
            style={customStyles?.actionsContainer}
        >
          {permissions.canView && isEnabled(actionsColumn.view?.enabled) && (
              <Tooltips message="Visualizar" placement="top">
                <div
                    className={style.actionButton}
                    style={customStyles?.actionButton}
                    onClick={() => actionsColumn.view?.onClick?.(item)}
                >
                  <Eye size={iconSize} />
                </div>
              </Tooltips>
          )}

          {permissions.canEdit && isEnabled(actionsColumn.edit?.enabled) && (
              <Tooltips message="Editar" placement="top">
                <div
                    className={style.actionButton}
                    style={customStyles?.actionButton}
                    onClick={() =>
                        actionsColumn.edit?.onClick
                            ? actionsColumn.edit.onClick(item)
                            : handleEdit(item)
                    }
                >
                  <Pencil size={iconSize} />
                </div>
              </Tooltips>
          )}

          {permissions.canDelete && isEnabled(actionsColumn.delete?.enabled) && (
              <Tooltips message="Excluir" placement="top">
                <div
                    className={`${style.actionButton} ${style.remove}`}
                    style={customStyles?.actionButton}
                    onClick={() => handleDeleteClick(item)}
                >
                  <Trash2 size={iconSize} />
                </div>
              </Tooltips>
          )}
        </div>
    );
  };

  const buildColumns = () => {
    const dynamicColumns = [];

    if (booleanColumn?.enabled) {
      dynamicColumns.push({
        key: "__boolean",
        header: booleanColumn.header,
        sortable: booleanColumn.sortable !== false,
        render: (item: T) => renderBooleanColumn(item, booleanColumn),
        width: booleanColumn.width || "80px",
      });
    }

    if (booleanColumns && booleanColumns.length > 0) {
      booleanColumns.forEach((boolConfig, index) => {
        if (boolConfig.enabled) {
          dynamicColumns.push({
            key: `__boolean_${index}`,
            header: boolConfig.header,
            sortable: boolConfig.sortable !== false,
            render: (item: T) => renderBooleanColumn(item, boolConfig),
            width: boolConfig.width || "80px",
          });
        }
      });
    }

    dynamicColumns.push(...columns);

    if (dateColumn?.enabled) {
      if (dateColumn.startDateField && dateColumn.endDateField) {
        dynamicColumns.push({
          key: "__startDate",
          header: "Data Inicial",
          sortable: dateColumn.sortable !== false,
          render: renderStartDateColumn,
          width: dateColumn.width || "120px",
        });

        dynamicColumns.push({
          key: "__endDate",
          header: "Data Final",
          sortable: dateColumn.sortable !== false,
          render: renderEndDateColumn,
          width: dateColumn.width || "120px",
        });
      } else {
        dynamicColumns.push({
          key: "__date",
          header: dateColumn.header || "Data",
          sortable: dateColumn.sortable !== false,
          render: renderDateColumn,
          width: dateColumn.width || "120px",
        });
      }
    }

    if (actionsColumn?.enabled) {
      const permissions = actionsColumn.permissions || {};
      const hasAnyPermission =
        permissions.canView || permissions.canEdit || permissions.canDelete;

      if (hasAnyPermission) {
        dynamicColumns.push({
          key: "__actions",
          header: actionsColumn.header || "Ações",
          sortable: false,
          render: renderActionsColumn,
          width: actionsColumn.width || "150px",
        });
      }
    }

    return dynamicColumns;
  };

  const finalColumns = buildColumns();

  const renderSkeletonLoading = () => {
    const skeletonRows = Array.from(
      { length: itemsPerPage || 5 },
      (_, index) => index
    );
    const widthVariants = ["wide", "medium", "narrow", "small"];

    return (
      <div
        className={style.skeletonContainer}
        style={customStyles?.loadingContainer}
      >
        <div
          className={style.skeletonFilters}
          style={customStyles?.filtersContainer}
        ></div>

        <div
          className={style.skeletonTableContainer}
          style={customStyles?.tableContainer}
        >
          <table className={style.skeletonTable} style={customStyles?.table}>
            <thead className={style.skeletonThead} style={customStyles?.thead}>
              <tr>
                {finalColumns.map((column, index) => (
                  <th
                    key={index}
                    className={style.skeletonHeader}
                    style={{ ...customStyles?.header, width: column.width }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={style.body} style={customStyles?.tbody}>
              {skeletonRows.map((_, rowIndex) => (
                <tr key={rowIndex} className={style.skeletonRow}>
                  {finalColumns.map((_, colIndex) => (
                    <td key={colIndex} className={style.skeletonCell}>
                      <div
                        className={`${style.skeletonShimmer} ${
                          style[widthVariants[colIndex % widthVariants.length]]
                        }`}
                      ></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={style.skeletonPagination}
          style={customStyles?.paginationContainer}
        >
          <div
            className={style.skeletonPaginationText}
            style={customStyles?.paginationText}
          ></div>
          <div className={style.skeletonPaginationButtons}>
            <div
              className={style.skeletonPaginationButton}
              style={customStyles?.paginationButton}
            ></div>
            <div
              className={style.skeletonPaginationText}
              style={{ ...customStyles?.paginationText, width: "6rem" }}
            ></div>
            <div
              className={style.skeletonPaginationButton}
              style={customStyles?.paginationButton}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return renderSkeletonLoading();
  }

  return (
    <>
      <div className={style.table} style={customStyles?.table}>
        {createButton && (
          <>
            <div className={style.createButtonContainer}>
              <button
                onClick={createButton.onClick}
                className={style.createButton}
              >
                <PlusCircle size={20} />
                {createButton.text}
              </button>
            </div>
          </>
        )}
        <div className={style.tableFilters}>
          <Filters
            searchable={searchable}
            searchTerm={searchTerm}
            hasDate={hasSearchDate}
            onSearchTermChange={setSearchTerm}
            dateFrom={dateFrom}
            onDateFromChange={setDateFrom}
            dateTo={dateTo}
            onDateToChange={setDateTo}
            genericFiltersState={genericFiltersState}
            onGenericFiltersChange={setGenericFiltersState}
            genericFilters={genericFilters}
            onFilter={handleFilter}
            onClearFilters={() => {
              setDateFrom(null);
              setDateTo(null);
              setSearchTerm("");
              setGenericFiltersState({});
            }}
            tableId={tableId}
            customStyles={customStyles}
          />
        </div>
        <div
          className={style.tableContainer}
          style={customStyles?.tableContainer}
        >
          <table className={style.table} style={customStyles?.table}>
            <thead className={style.thead} style={customStyles?.thead}>
              <tr>
                {finalColumns.map((column, index) => (
                  <th
                    key={String(column.key) + index}
                    className={`${style.header} ${
                      column.sortable !== false && sortable ? style.sort : ""
                    } ${
                      String(column.key).startsWith("__")
                        ? String(column.key).replace("__", "")
                        : String(column.key)
                    }`}
                    style={{ width: column.width, ...customStyles?.header }}
                    onClick={() =>
                      column.sortable !== false && handleSort(column.key)
                    }
                  >
                    <div className={style.headerContainer}>
                      <span>{column.header}</span>
                      {column.sortable !== false && sortable && (
                        <div className={style.iconContainer}>
                          <ChevronUp
                            className={`${style.icon} ${
                              sortConfig?.key === column.key &&
                              sortConfig?.direction === "asc"
                                ? style.Inactive
                                : style.Active
                            }`}
                            size={iconSize}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={style.body} style={customStyles?.tbody}>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={finalColumns.length}
                    className={style.emptyMessage}
                    style={customStyles?.emptyMessage}
                  >
                    Nenhuma informação foi encontrada!
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, rowIndex) => (
                  <tr
                    key={item.id || rowIndex}
                    className={style.tr}
                    style={customStyles?.row}
                  >
                    {finalColumns.map((column, colIndex) => (
                      <td
                        key={String(column.key) + colIndex}
                        className={`${style.td} ${
                          String(column.key).startsWith("__")
                            ? String(column.key).replace("__", "")
                            : String(column.key)
                        }`}
                        style={customStyles?.cell}
                      >
                        {editingRowId === item.id ? (
                          column.key === "role" ? (
                            <SelectedList
                              placeholder={editedRowData[String(column.key)]}
                              field={column.key}
                              list={form}
                              setList={setForm}
                              options={optionsMap[String(column.key)]}
                              isType
                              readOnly={true}
                              className={style.inputList}
                            />
                          ) : column.key === "status" ? (
                            <div>
                              <div className={style.sliderContainerEdit}>
                                <label className={style.switch}>
                                  <input
                                    type="checkbox"
                                    className={style.inputSlider}
                                    checked={editedRowData.status === "active"}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "status",
                                        e.target.checked ? "active" : "inactive"
                                      )
                                    }
                                  />
                                  <span className={style.slider}></span>
                                </label>
                                <div className={style.sliderText}>
                                  <span className={style.span}>
                                    {editedRowData.status === "active"
                                      ? "Ativo"
                                      : "Inativo"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : String(column.key).startsWith("__") ? (
                            column.render ? (
                              column.render(item)
                            ) : null
                          ) : (
                            <input
                              placeholder={String(column.key)}
                              type="text"
                              value={editedRowData[String(column.key)] || ""}
                              onChange={(e) =>
                                handleFieldChange(
                                  String(column.key),
                                  e.target.value
                                )
                              }
                              className={style.editInput}
                            />
                          )
                        ) : (
                          (() => {
                            try {
                              if (column.render) {
                                return column.render(item);
                              }

                              const value = getNestedValue(
                                item,
                                String(column.key)
                              );

                              if (
                                value === null ||
                                value === undefined ||
                                value === ""
                              ) {
                                return (
                                  <span
                                    style={{
                                      color: "#9ca3af",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    -
                                  </span>
                                );
                              }

                              if (Array.isArray(value)) {
                                return value.join(", ");
                              }

                              if (typeof value === "object") {
                                return JSON.stringify(value);
                              }

                              return value;
                            } catch (error) {
                              return (
                                <span
                                  style={{
                                    color: "#ef4444",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Erro
                                </span>
                              );
                            }
                          })()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination && totalPages > 1 && (
          <div
            className={style.paginationContainer}
            style={customStyles?.paginationContainer}
          >
            <div
              className={style.detailsContainer}
              style={customStyles?.paginationText}
            >
              Mostrando de {startIndex + 1} a{" "}
              {Math.min(startIndex + itemsPerPage, sortedData.length)} de{" "}
              {sortedData.length} registros
            </div>
            <div className={style.buttonsContainer}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={style.button}
                style={customStyles?.paginationButton}
              >
                Anterior
              </button>
              <span
                className={style.pages}
                style={customStyles?.paginationText}
              >
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={style.button}
                style={customStyles?.paginationButton}
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        customStyles={style}
      >
        <div className={style.deleteModalContent}>
          <h3 className={style.deleteModalTitle}>Confirmar Exclusão</h3>

          <p className={style.deleteModalMessage}>{deleteConfirmMessage}</p>

          <div className={style.deleteModalButtons}>
            <button
              onClick={handleCancelDelete}
              className={style.deleteModalCancelButton}
            >
              Cancelar
            </button>

            <button
              onClick={handleConfirmDelete}
              className={style.deleteModalConfirmButton}
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Table;
