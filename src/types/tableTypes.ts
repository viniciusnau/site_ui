export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

export interface BooleanColumnConfig<T> {
  enabled: boolean;
  header: string;
  field: keyof T | string;
  checkValue?: any | any[];
  xValue?: any | any[];
  scheduledValue?: any | any[];
  width?: string;
  sortable?: boolean;
}

export interface DateColumnConfig<T> {
  enabled: boolean;
  header?: string;
  dateField: keyof T | string;
  startDateField?: keyof T | string;
  endDateField?: keyof T | string;
  width?: string;
  sortable?: boolean;
}

export interface ActionsColumnConfig<T> {
  enabled: boolean;
  header?: string;
  width?: string;
  permissions?: {
    canView?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canCreate?: boolean;
  };
  view?: {
    enabled?: boolean;
    onClick: (item: T) => void;
  };
  edit?: {
    enabled?: boolean;
    onClick?: (item: T) => void;
  };
  delete?: {
    enabled?: boolean;
    onClick?: (item: T) => void;
    confirmMessage?: string;
  };
}

export interface GenericFilterConfig<T> {
  enabled: boolean;
  label: string;
  column: keyof T | string;
  options: string[] | Record<string, string>;
  width?: string;
  multiple?: boolean;
}

export interface TableCustomStyles {
  tbodyContainer?: React.CSSProperties;
  container?: React.CSSProperties;
  filtersContainer?: React.CSSProperties;
  filtersRow?: React.CSSProperties;
  filterGroup?: React.CSSProperties;
  filterLabel?: React.CSSProperties;
  filterInput?: React.CSSProperties;
  filterButton?: React.CSSProperties;
  clearButton?: React.CSSProperties;
  tableContainer?: React.CSSProperties;
  table?: React.CSSProperties;
  thead?: React.CSSProperties;
  header?: React.CSSProperties;
  tbody?: React.CSSProperties;
  row?: React.CSSProperties;
  cell?: React.CSSProperties;
  emptyMessage?: React.CSSProperties;
  loadingContainer?: React.CSSProperties;
  paginationContainer?: React.CSSProperties;
  paginationButton?: React.CSSProperties;
  paginationText?: React.CSSProperties;
  statusContainer?: React.CSSProperties;
  dateContainer?: React.CSSProperties;
  actionsContainer?: React.CSSProperties;
  actionButton?: React.CSSProperties;
  selectWrapper?: React.CSSProperties;
  dropdown?: React.CSSProperties;
  dropdownOption?: React.CSSProperties;
  selectedTag?: React.CSSProperties;
  modal?: React.CSSProperties;
  modalInput?: React.CSSProperties;
  modalButtonsContainer?: React.CSSProperties;
  modalButton?: React.CSSProperties;
}

export interface CreateButtonConfig {
  enabled?: boolean;
  text?: string;
  onClick: () => void;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onAdd?: (newItem: Omit<T, "id">) => void;
  onDelete?: (id: number | string) => void;
  loading?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  className?: string;
  customStyles?: TableCustomStyles;
  booleanColumn?: BooleanColumnConfig<T>;
  booleanColumns?: BooleanColumnConfig<T>[];
  dateColumn?: DateColumnConfig<T>;
  actionsColumn?: ActionsColumnConfig<T>;
  createButton?: CreateButtonConfig;
  onDateFilter?: (dateFrom: Date | null, dateTo: Date | null) => void;
  onSearchFilter?: (searchTerm: string) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  genericFilters?: GenericFilterConfig<T>[];
  onGenericFilter?: (filters: Record<string, string | string[]>) => void;
  hasSearchDate?: boolean;
}