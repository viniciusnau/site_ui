import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
  BooleanColumnConfig,
} from "../../../../../types/tableTypes";
import React, { useEffect, useState } from "react";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanner,
  patchBanner,
  postBanner,
  removeBanner,
} from "../../../../../Services/Slices/BannerSlice";
import { bannerForm } from "../../../../../Services/interfaces";
import DOMPurify from "dompurify";
import { banner } from "../../../../../Components/TableInterfaces";
import BannerModal from "../../../../../Components/ModalTabs/BannerModal";
import style from "./Banner.module.css";

function Banner() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<banner | null>(null);
  const data = useSelector((state: any) => state.bannerSlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    banner: false,
    group: false,
  });
  const initialForm: bannerForm = {
    status: "not_published",
    alt: "",
    banner: null,
    banner_mobile: null,
    position: null,
    group: "",
    slug: "",
  };
  const [form, setForm] = useState<bannerForm>(initialForm);

  const resetForm = (custom?: Partial<bannerForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchBanner());
  }, [dispatch]);

  const handleChange = (value: any, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]:
        type === "position"
          ? value === ""
            ? null
            : Number(value)
          : DOMPurify.sanitize(String(value)),
    }));
  };

  const handleDelete = async (bannerItem: any) => {
    try {
      await dispatch<any>(removeBanner(bannerItem.id));
      setSnackbarType("deleteSuccess");
      setSnackbarMessage("");
    } catch (err: any) {
      console.error("Erro ao deletar:", err);
      setSnackbarType("deleteError");
      setSnackbarMessage(err);
    }
  };

  const handleClose = () => {
    resetForm();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSubmit = async (form: bannerForm, id?: number) => {
    const newErrors = {
      banner: !form.banner,
      group: !form.group.trim(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("alt", form.alt);
    formData.append("group", form.group);
    formData.append("slug", form.slug);
    if (form.position !== null && form.position !== undefined) {
      formData.append("position", String(form.position));
    }

    if (form.banner instanceof File) {
      formData.append("banner", form.banner);
    }
    if (form.banner_mobile instanceof File) {
      formData.append("banner_mobile", form.banner_mobile);
    }

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchBanner(formData, id));
      } else {
        response = await dispatch<any>(postBanner(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar Banner");
      }

      await dispatch<any>(fetchBanner());

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

      setSnackbarType(id ? "patchError" : "postError");
      setSnackbarMessage(errorMessage);
      handleClose();
    }
  };

  const booleanConfig: BooleanColumnConfig<banner> = {
    enabled: true,
    header: "Status",
    field: "status",
    checkValue: "published",
    xValue: "not_published",
    scheduledValue: "scheduled",
    width: "50px",
    sortable: false,
  };

  const createButton: CreateButtonConfig = {
    text: "Criar novo Banner",
    onClick: () => {
      setErrors({ banner: false, group: false });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Status",
      column: "status" as keyof banner,
      options: { published: "Publicado", not_published: "Não publicado" },
      width: "200px",
      multiple: false,
    },
  ];

  const columns: TableColumn<banner>[] = [
        {
          key: "banner",
          header: "Banner",
          sortable: false,
          width: "150px",
          render: (item) => {
            let imageUrl = "";
    
            if (item.banner instanceof File) {
              imageUrl = URL.createObjectURL(item.banner);
            } else if (typeof item.banner === "string") {
              imageUrl = item.banner;
            }
    
            return imageUrl ? (
              <div className={style.colorCell}>
                <img
                  src={imageUrl}
                  alt="banner"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    borderRadius: 4,
                  }}
                />
              </div>
            ) : null;
          },
        },
                {
          key: "banner_mobile",
          header: "Banner Mobile",
          sortable: false,
          width: "150px",
          render: (item) => {
            let imageUrl = "";
    
            if (item.banner_mobile instanceof File) {
              imageUrl = URL.createObjectURL(item.banner_mobile);
            } else if (typeof item.banner_mobile === "string") {
              imageUrl = item.banner_mobile;
            }
    
            return imageUrl ? (
              <div className={style.colorCell}>
                <img
                  src={imageUrl}
                  alt="banner mobile"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    borderRadius: 4,
                  }}
                />
              </div>
            ) : <span>-</span>;
          },
        },
    {
      key: "alt",
      header: "Texto alternativo",
      sortable: false,
      width: "150px",
    },
    {
      key: "group",
      header: "Grupo",
      sortable: false,
      width: "150px",
      render: (item) => {
        const labels: Record<string, string> = {
          slides: "Slides",
          footer_banner: "Banner do rodapé",
        };
        return labels[item.group] || item.group;
      },
    },
    {
      key: "position",
      header: "Posição",
      sortable: true,
      width: "150px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<banner> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: {
      canView: false,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
    view: {
      enabled: false,
      onClick: (item) => {},
    },

    edit: {
      onClick: (item) => {
        setErrors({ banner: false, group: false });
        setSelectedItem(item);
        resetForm({
          status: item.status ?? "",
          alt: item.alt ?? "",
          banner: item.banner ?? null,
          banner_mobile: item.banner_mobile ?? null,
          position: item.position ?? null,
          group: item.group ?? "",
          slug: item.slug ?? "",
        });
        setIsEditModalOpen(true);
      },
    },

    delete: {
      confirmMessage: `Tem certeza que deseja excluir este banner? Esta ação não pode ser desfeita.`,
      onClick: (item) => {
        handleDelete(item);
      },
    },
  };
  return (
    <>
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

      <BannerModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleClose}
        title={isCreateModalOpen ? "Criar Banner" : "Editar Banner"}
        form={form}
        setForm={setForm}
        onSubmit={() =>
          handleSubmit(form, isEditModalOpen ? selectedItem?.id : undefined)
        }
        errors={errors}
        setErrors={setErrors}
        mode={isCreateModalOpen ? "create" : "edit"}
        handleChange={handleChange}
        customStyles={style}
      />

      <Table
        data={data}
        columns={columns}
        genericFilters={genericFiltersConfig}
        actionsColumn={ActionsConfig}
        booleanColumn={booleanConfig}
        createButton={createButton}
        searchable
        sortable
        pagination
        itemsPerPage={6}
      />
    </>
  );
}

export default Banner;
