import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ModulesTable.module.css";
import { fetchCategory } from "../../Services/Slices/CategorySlice";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { searchParams } from "../../Services/interfaces";
import DOMPurify from "dompurify";
import { CalendarDays } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import { ImagesPATH } from "../../PATH";

interface RecordItem {
  id: number;
  title: string;
  status: string;
  attachment: string;
  slug?: string;
  category?: number;
  sub_category?: number;
  published_at?: string;
}

interface SubCategory {
  id: number;
  title: string;
  category: number;
  status: string;
  records?: RecordItem[];
}

interface Category {
  id: number;
  title: string;
  status: string;
  description?: string;
  records_count?: number;
  subcategories?: SubCategory[];
  records?: RecordItem[];
}

interface ModulesTableProps {
  categoryIds?: number | number[];
}

const ModulesTable: React.FC<ModulesTableProps> = ({ categoryIds }) => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state: any) => state.categorySlice.data);
  const categories: Category[] = useMemo(() => {
    if (!categoryData) return [];
    return Array.isArray(categoryData) ? categoryData : [categoryData];
  }, [categoryData]);

  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<{
    type: "category" | "subcategory";
    id: number;
  } | null>(null);

  const initialForm: searchParams = {
    searchTerm: "",
    startDate: null,
    endDate: null,
  };
  const [form, setForm] = useState<searchParams>(initialForm);
  const [page, setPage] = useState<number>(1);
  const recordsPerPage = 6;

  const normalizedCategoryIds = useMemo(
    () =>
      categoryIds
        ? Array.isArray(categoryIds)
          ? categoryIds
          : [categoryIds]
        : undefined,
    [categoryIds]
  );

  useEffect(() => {
    if (normalizedCategoryIds?.length) {
      dispatch<any>(fetchCategory(normalizedCategoryIds));
    }
  }, [dispatch]);

  const publishedCategories = useMemo(() => {
    const published = categories.filter(
      (category) => category.status === "published"
    );
    return normalizedCategoryIds?.length
      ? published.filter((category) =>
          normalizedCategoryIds.includes(category.id)
        )
      : published;
  }, [categories, normalizedCategoryIds]);

  const allSubcategories = useMemo(
    () =>
      publishedCategories.flatMap((category) =>
        (category.subcategories || []).filter(
          (subcategory) => subcategory.status === "published"
        )
      ),
    [publishedCategories]
  );

  const getDisplayRecords = (): RecordItem[] => {
    if (!selectedItem) return [];
    if (selectedItem.type === "category") {
      const category = publishedCategories.find(
        (c) => c.id === selectedItem.id
      );
      if (!category) return [];
      const recordsFromSubs = (category.subcategories || []).flatMap((sub) =>
        (sub.records || []).filter((r) => r && r.status === "published")
      );
      const directRecords = (category as any).records || [];
      return [...recordsFromSubs, ...(directRecords || [])];
    } else {
      const sub = allSubcategories.find((s) => s.id === selectedItem.id);
      if (!sub) return [];
      return (sub.records || []).filter((r) => r && r.status === "published");
    }
  };

  const getAllDisplayRecords = (): RecordItem[] => {
    const categoriesRecords = publishedCategories
      .flatMap((category) => category.records || [])
      .filter((records) => records && records.status === "published");
    return categoriesRecords;
  };

  const applySearchAndDateFilter = (items: RecordItem[]) => {
    return items.filter((rec) => {
      const matchesSearch =
        !form.searchTerm ||
        (rec.title || "")
          .toString()
          .toLowerCase()
          .includes(form.searchTerm.toLowerCase());
      let matchesDate = true;
      const recDate = rec.published_at ? dayjs(rec.published_at) : null;
      if (recDate) {
        if (form.startDate && recDate.isBefore(form.startDate, "day"))
          matchesDate = false;
        if (form.endDate && recDate.isAfter(form.endDate, "day"))
          matchesDate = false;
      } else {
        if (form.startDate || form.endDate) matchesDate = false;
      }
      return matchesSearch && matchesDate;
    });
  };

  const displayRecords = applySearchAndDateFilter(getDisplayRecords());
  const displayAllRecords = applySearchAndDateFilter(getAllDisplayRecords());

  const currentRecords = (
    selectedItem ? displayRecords : displayAllRecords
  ).slice((page - 1) * recordsPerPage, page * recordsPerPage);

  const totalRecords = selectedItem
    ? displayRecords.length
    : displayAllRecords.length;

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (catId: number) => {
    const cat = publishedCategories.find((c) => c.id === catId);
    const subs = (cat?.subcategories || []).filter(
      (s) => s.status === "published"
    );
    if (subs.length === 0) {
      setSelectedItem({ type: "category", id: catId });
      setOpenCategoryId(null);
    } else {
      setOpenCategoryId(openCategoryId === catId ? null : catId);
      setSelectedItem(null);
    }
    setPage(1);
  };

  const handleSubCategorySelect = (subId: number) => {
    setSelectedItem({ type: "subcategory", id: subId });
    setPage(1);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const handleChange = (value: string, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: DOMPurify.sanitize(value),
    }));
  };

  const getCurrentTitle = () => {
    if (!selectedItem) return "";
    if (selectedItem.type === "category") {
      return (
        publishedCategories.find((c) => c.id === selectedItem.id)?.title || ""
      );
    }
    return allSubcategories.find((s) => s.id === selectedItem.id)?.title || "";
  };

  const getFileUrl = (record: RecordItem): string | null => {
    if (!record?.attachment) return null;

    return record.attachment.startsWith("http")
      ? record.attachment
      : `${ImagesPATH.base}${record.attachment.startsWith("/") ? "" : "/"}${
          record.attachment
        }`;
  };

  const formatFileName = (fileName: string): string => {
    const parts = fileName.split("/media/records/attachments/");
    return parts.length > 1 ? parts[1] : "download.pdf";
  };

  const createAndClickLink = (
    url: string,
    fileName?: string,
    newTab: boolean = false
  ) => {
    const link = document.createElement("a");
    link.href = url;
    link.rel = "noopener noreferrer";

    if (newTab) {
      link.target = "_blank";
    } else if (fileName) {
      link.download = fileName;
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (record: RecordItem) => {
    const fileUrl = getFileUrl(record);
    if (!fileUrl) return;
    createAndClickLink(fileUrl, undefined, true);
  };

  const handleDownload = async (record: RecordItem) => {
    const fileUrl = getFileUrl(record);
    if (!fileUrl) return;
    const response = await fetch(fileUrl);
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const fileName = formatFileName(record.attachment);

    createAndClickLink(url, fileName);
    window.URL.revokeObjectURL(url);
  };

  const handleSearch = () => {
    setPage(1);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          {publishedCategories.length === 0 && (
            <div className={styles.emptyState}>Nenhuma categoria publicada</div>
          )}

          {publishedCategories.map((cat) => {
            const subs = (cat.subcategories || []).filter(
              (s) => s && s.status === "published"
            );
            const isCatSelected =
              selectedItem?.type === "category" && selectedItem.id === cat.id;

            return (
              <div key={cat.id} className={styles.categoryBlock}>
                <button
                  className={`${styles.categoryButton} ${
                    isCatSelected || openCategoryId === cat.id
                      ? styles.categoryButtonActive
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.title}
                </button>

                {openCategoryId === cat.id && subs.length > 0 && (
                  <div className={styles.subcategoryList}>
                    {subs.map((sub) => {
                      const isSubActive =
                        selectedItem?.type === "subcategory" &&
                        selectedItem.id === sub.id;
                      return (
                        <div key={sub.id} className={styles.subcategoryBlock}>
                          <button
                            className={`${styles.subcategoryButton} ${
                              isSubActive ? styles.subcategoryButtonActive : ""
                            }`}
                            onClick={() => handleSubCategorySelect(sub.id)}
                          >
                            {sub.title}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.content}>
          <div className={styles.searchBar}>
            <DatePicker
              label="Data Inicial"
              value={form.startDate}
              onChange={(newValue) =>
                setForm((prev) => ({
                  ...prev,
                  startDate: newValue as Dayjs | null,
                }))
              }
              format="DD/MM/YYYY"
              className={styles.dateInput}
            />

            <DatePicker
              label="Data Final"
              value={form.endDate}
              onChange={(newValue) =>
                setForm((prev) => ({
                  ...prev,
                  endDate: newValue as Dayjs | null,
                }))
              }
              format="DD/MM/YYYY"
              className={styles.dateInput}
            />

            <input
              type="text"
              placeholder="Palavra para buscar..."
              className={styles.searchInput}
              value={form.searchTerm}
              onChange={(e) => handleChange(e.target.value, "searchTerm")}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
              Buscar
            </button>
          </div>

          <div className={styles.recordsInfo}>
            Total de arquivos para Download: <strong>{totalRecords}</strong>
          </div>

          {selectedItem && (
            <div className={styles.categoryTitle}>{getCurrentTitle()}</div>
          )}

          <div className={styles.recordsList}>
            {currentRecords.length === 0 && (
              <div className={styles.emptyState}>Nenhum arquivo encontrado</div>
            )}
            {currentRecords.map((rec) => (
              <div key={rec.id} className={styles.recordCard}>
                <div className={styles.recordInfo}>
                  <h3 className={styles.recordTitle}>{rec.title}</h3>
                  <div className={styles.recordMeta}>
                    {rec.published_at && (
                      <>
                        <span className={styles.metaIcon}>
                          <CalendarDays />
                        </span>
                        <span className={styles.metaText}>
                          {formatDate(rec.published_at)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.recordActions}>
                  <button
                    className={styles.downloadButton}
                    onClick={() => handleDownload(rec)}
                  >
                    Baixar
                  </button>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleView(rec)}
                  >
                    Visualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ModulesTable;
