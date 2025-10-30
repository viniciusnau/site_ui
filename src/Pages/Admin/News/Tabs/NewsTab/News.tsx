import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  BooleanColumnConfig,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../../../types/tableTypes";
import style from "./News.module.css";
import { news } from "../../../../../Components/TableInterfaces";
import {
  fetchNews,
  removeNews,
  postNews,
  patchNews,
} from "../../../../../Services/Slices/NewsSlice";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { NewsForm } from "../../../../../Services/interfaces";
import { fetchTag } from "../../../../../Services/Slices/TagSlice";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NewsModal from "../../../../../Components/ModalTabs/NewsModal";
import DOMPurify from "dompurify";
import dayjs from "dayjs";

export type NewsInputType = "title" | "url" | "text";

function News() {
  const data = useSelector((state: any) => state.newsSlice.data);
  const dispatch = useDispatch();
  const tags = useSelector((state: any) => state.tagSlice.data);
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<news | null>(null);
  const [imagesId, setImagesId] = useState<number[]>([]);
  const [attachmentsId, setAttachmentsId] = useState<number[]>([]);
  const [errors, setErrors] = useState({
    title: false,
    thumbnail: false,
    text: false,
  });

  const initialForm: NewsForm = {
    status: "published",
    title: "",
    subtitle: "",
    scheduled_at: null,
    scheduled_date: null,
    slug: "",
    scheduled_time: null,
    highlight: "normal",
    tags: [],
    text: "",
    thumbnail: null,
    gallery: [],
    removed_gallery: [],
    attachments: [],
    removed_attachments: [],
  };
  const [form, setForm] = useState<NewsForm>(initialForm);

  const resetForm = (custom?: Partial<NewsForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  const createNews: CreateButtonConfig = {
    text: "Criar nova notícia",
    onClick: () => {
      setErrors({ title: false, thumbnail: false, text: false });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  useEffect(() => {
    dispatch<any>(fetchNews());
    dispatch<any>(fetchTag());
  }, [dispatch]);

  const handleClose = () => {
    resetForm();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleChange = (value: string, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: DOMPurify.sanitize(value),
    }));
  };

  const handleDelete = async (newsItem: any) => {
    try {
      await dispatch<any>(removeNews(newsItem.id));
      setSnackbarType("deleteSuccess");
      setSnackbarMessage("");
    } catch (err: any) {
      console.error("Erro ao deletar:", err);
      setSnackbarType("deleteError");
      setSnackbarMessage(err);
    }
  };

  const handleSubmit = async (form: NewsForm, id?: number) => {
    const newErrors = {
      title: !form.title.trim(),
      thumbnail: !form.thumbnail,
      text: !form.text.trim(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();

    formData.append("status", form.status);
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("highlight", form.highlight);
    formData.append("text", form.text);

    let scheduled_at = "";

    if (form.scheduled_date) {
      scheduled_at = `${form.scheduled_date.format("YYYY-MM-DD")}T00:00:00`;

      if (form.scheduled_time) {
        scheduled_at = `${form.scheduled_date.format(
          "YYYY-MM-DD"
        )}T${form.scheduled_time.format("HH:mm")}:00`;
      }
    } else if (form.scheduled_time) {
      const today = dayjs();
      scheduled_at = `${today.format(
        "YYYY-MM-DD"
      )}T${form.scheduled_time.format("HH:mm")}:00`;
    }

    if (scheduled_at) {
      formData.append("scheduled_at", scheduled_at);
    }

    if (form.tags && form.tags.length > 0) {
      form.tags.forEach((tagId) => formData.append("tags", tagId.toString()));
    } else {
      formData.append("clear_tags", "true");
    }

    if (form.thumbnail instanceof File) {
      formData.append("thumbnail", form.thumbnail);
    } else if (form.thumbnail === null) {
      formData.append("remove_thumbnail", "true");
    }

    const newGalleryFiles = form.gallery.filter(
      (item) => item instanceof File
    ) as File[];
    newGalleryFiles.forEach((file) => formData.append("gallery", file));

    form.removed_gallery.forEach((id) =>
      formData.append("removed_gallery", id.toString())
    );

    const newAttachments = form.attachments.filter(
      (item) => item instanceof File
    ) as File[];
    newAttachments.forEach((file) => formData.append("attachments", file));

    form.removed_attachments.forEach((id) =>
      formData.append("removed_attachments", id.toString())
    );

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchNews(formData, id));
      } else {
        response = await dispatch<any>(postNews(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar notícia");
      }

      if (id) {
        setSnackbarType("patchSuccess");
        setSnackbarMessage("");
        setIsEditModalOpen(false);
      } else {
        setSnackbarType("postSuccess");
        setSnackbarMessage("");
        handleClose();
      }
    } catch (err: any) {
      console.error("Erro ao enviar Banner:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.response?.data?.__all__?.[0] ||
            err?.message ||
            "Erro ao salvar banner";

      if (id) {
        setSnackbarType("patchError");
        setSnackbarMessage(errorMessage);
        setIsEditModalOpen(false);
      } else {
        setSnackbarType("postError");
        setSnackbarMessage(errorMessage);
        handleClose();
      }
    }
  };

  const STATUS_OPTIONS: Record<string, string> = {
    published: "Publicado",
    not_published: "Não Publicado",
    scheduled: "Agendado",
  };

  const HIGHLIGHT_OPTIONS: Record<string, string> = {
    main: "Destaque",
    secondary: "Sub-destaque",
    normal: "Normal",
  };

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Status",
      column: "status" as keyof news,
      options: STATUS_OPTIONS,
      width: "200px",
      multiple: false,
    },
    {
      enabled: true,
      label: "Destaque",
      column: "highlight" as keyof news,
      options: HIGHLIGHT_OPTIONS,
      width: "200px",
      multiple: true,
    },
  ];

  const booleanConfig: BooleanColumnConfig<news>[] = [
    {
      enabled: true,
      header: "Status",
      field: "status",
      checkValue: "published",
      xValue: "not_published",
      scheduledValue: "scheduled",
      width: "50px",
      sortable: false,
    },
    {
      enabled: true,
      header: "Destaque",
      field: "highlight",
      checkValue: "main",
      xValue: ["secondary", "normal"],
      width: "40px",
      sortable: true,
    },
    {
      enabled: true,
      header: "Sub-destaque",
      field: "highlight",
      checkValue: "secondary",
      xValue: ["main", "normal"],
      width: "40px",
      sortable: true,
    },
  ];

  const columns: TableColumn<news>[] = [
    {
      key: "title",
      header: "Título",
      sortable: false,
      width: "300px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<news> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: {
      canView: true,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
    view: {
      enabled: true,
      onClick: (item) => {
        window.open(`/${item.path}`, "_blank");
      },
    },

    edit: {
      onClick: (item) => {
        setErrors({ title: false, thumbnail: false, text: false });
        setSelectedItem(item);

        let scheduledDate = null;
        let scheduledTime = null;
        if (item.scheduled_at) {
          scheduledDate = dayjs(item.scheduled_at);
          scheduledTime = dayjs(item.scheduled_at);
        }

        resetForm({
          status: item.status || "",
          title: item.title || "",
          subtitle: item.subtitle || "",
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          highlight: item.highlight || "normal",
          text: item.text || "",
          thumbnail: item.thumbnail || null,
          gallery: item.gallery
            ? item.gallery.map((g: any) => {
                if (typeof g === "object" && g.image) {
                  return g;
                }
                if (typeof g === "string") {
                  return { image: g };
                }
                return { image: g.url || g.path || g };
              })
            : [],
          attachments: item.attachments || [],
          tags: item.tags
            ? item.tags.map((tag: any) =>
                typeof tag === "object" ? tag.id : Number(tag)
              )
            : [],
        });

        setIsEditModalOpen(true);
      },
    },
    delete: {
      confirmMessage: `Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.`,
      onClick: (item) => {
        handleDelete(item);
      },
    },
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}>
        {snackbarType === "noneChange" && (
          <Snackbar
            type="noneChange"
            setSnackbarType={setSnackbarType}
            customMessage={snackbarMessage}
          />
        )}
        {snackbarType === "postSuccess" && (
          <Snackbar
            type="postSuccess"
            setSnackbarType={setSnackbarType}
            customMessage={snackbarMessage}
          />
        )}
        {snackbarType === "postError" && (
          <Snackbar
            type="postError"
            setSnackbarType={setSnackbarType}
            customMessage={snackbarMessage}
          />
        )}
        {snackbarType === "patchSuccess" && (
          <Snackbar
            type="patchSuccess"
            setSnackbarType={setSnackbarType}
            customMessage={snackbarMessage}
          />
        )}
        {snackbarType === "patchError" && (
          <Snackbar
            type="patchError"
            setSnackbarType={setSnackbarType}
            customMessage={snackbarMessage}
          />
        )}
        {snackbarType === "deleteSuccess" && (
          <Snackbar
            type="deleteSuccess"
            setSnackbarType={setSnackbarType}
            customMessage={snackbarMessage}
          />
        )}
        {snackbarType === "deleteError" && (
          <Snackbar
            type="deleteError"
            setSnackbarType={setSnackbarType}
            customMessage={snackbarMessage}
          />
        )}

        <NewsModal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={handleClose}
          title={isCreateModalOpen ? "Criar Notícia" : "Editar Notícia"}
          form={form}
          setForm={setForm}
          onSubmit={() =>
            handleSubmit(form, isEditModalOpen ? selectedItem?.id : undefined)
          }
          errors={errors}
          setErrors={setErrors}
          editedHTML={form.text}
          mode={isCreateModalOpen ? "create" : "edit"}
          handleChange={handleChange}
          tags={tags}
          customStyles={style}
          imagesId={imagesId}
          setImagesId={setImagesId}
          attachmentsId={attachmentsId}
          setAttachmentsId={setAttachmentsId}
        />

        <Table
          data={data}
          columns={columns}
          booleanColumns={booleanConfig}
          actionsColumn={ActionsConfig}
          createButton={createNews}
          genericFilters={genericFiltersConfig}
          dateColumn={{
            enabled: true,
            header: "Criado em",
            dateField: "created_at",
            width: "120px",
            sortable: true,
          }}
          searchable
          sortable
          pagination
          itemsPerPage={6}
        />
      </LocalizationProvider>
    </>
  );
}

export default News;
