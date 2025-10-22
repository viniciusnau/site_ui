import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../../../types/tableTypes";
import React, { useEffect, useState } from "react";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { quickAccessButtonsForm } from "../../../../../Services/interfaces";
import DOMPurify from "dompurify";
import { quickAccessButtons } from "../../../../../Components/TableInterfaces";
import style from "./QuickAccessButtonsAdmin.module.css";
import QuickAccessButtonsModal from "../../../../../Components/ModalTabs/QuickAccessButtonsModal";
import {
  patchQuickAccessButtons,
  postQuickAccessButtons,
  fetchQuickAccessButtons,
  removeQuickAccessButtons,
} from "../../../../../Services/Slices/QuickAccessButtonsSlice";

function QuickAccessButtonsAdmin() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<quickAccessButtons | null>(
    null
  );
  const data = useSelector((state: any) => state.quickAccessButtonsSlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    image: false,
    title: false,
    position: false,
    group: false,
    link: false,
  });
  const initialForm: quickAccessButtonsForm = {
    status: "published",
    title: "",
    title_color: "#000000",
    link: "",
    position: null,
    image: null,
    group: "",
    background_color: "#ffffff",
  };
  const [form, setForm] = useState<quickAccessButtonsForm>(initialForm);

  const resetForm = (custom?: Partial<quickAccessButtonsForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchQuickAccessButtons());
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

  const handleDelete = async (QuickAccessButtonsItem: any) => {
    try {
      await dispatch<any>(removeQuickAccessButtons(QuickAccessButtonsItem.id));
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

  const handleSubmit = async (form: quickAccessButtonsForm, id?: number) => {
    const newErrors = {
      image: !form.image,
      title: !form.title.trim(),
      position: !form.position,
      group: !form.group,
      link: !form.link.trim(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("title", form.title);
    formData.append("title_color", form.title_color);
    formData.append("background_color", form.background_color);
    formData.append("link", form.link);
    if (form.position !== null && form.position !== undefined) {
      formData.append("position", String(form.position));
    }
    if (form.group !== null && form.group !== undefined) {
      formData.append("group", String(form.group));
    }

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchQuickAccessButtons(formData, id));
      } else {
        response = await dispatch<any>(postQuickAccessButtons(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar botão de atendimento");
      }

      await dispatch<any>(fetchQuickAccessButtons());

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
      console.error("Erro ao enviar botão de atendimento:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.response?.data?.__all__?.[0] ||
            err?.message ||
            "Erro ao salvar botão de atendimento";

      setSnackbarType(id ? "patchError" : "postError");
      setSnackbarMessage(errorMessage);
      handleClose();
    }
  };

  const createButton: CreateButtonConfig = {
    text: "Criar novo Botão de acesso rápido",
    onClick: () => {
      setErrors({
        position: false,
        title: false,
        image: false,
        group: false,
        link: false,
      });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Grupo",
      column: "group" as keyof quickAccessButtons,
      options: { above_group: "Parte superior", under_group: "Parte inferior" },
      width: "200px",
      multiple: false,
    },
  ];

  const columns: TableColumn<quickAccessButtons>[] = [
    {
      key: "image",
      header: "Ícone",
      sortable: false,
      width: "150px",
      render: (item) => {
        let imageUrl = "";

        if (item.image instanceof File) {
          imageUrl = URL.createObjectURL(item.image);
        } else if (typeof item.image === "string") {
          imageUrl = item.image;
        }

        return imageUrl ? (
          <div className={style.colorCell}>
            <img
              src={imageUrl}
              alt="ícone"
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
      key: "title",
      header: "Título",
      sortable: false,
      width: "150px",
    },
    {
      key: "title_color",
      header: "Cor do título",
      sortable: false,
      width: "150px",
      render: (item) => (
        <div className={style.colorCell}>
          <div
            className={style.colorPreview}
            style={{
              backgroundColor: item.title_color || "#ccc",
            }}
          />
          <span className={style.colorText}>{item.title_color}</span>
        </div>
      ),
    },
    {
      key: "background_color",
      header: "Cor do Plano de fundo",
      sortable: false,
      width: "150px",
      render: (item) => (
        <div className={style.colorCell}>
          <div
            className={style.colorPreview}
            style={{
              backgroundColor: item.background_color || "#ccc",
            }}
          />
          <span className={style.colorText}>{item.background_color}</span>
        </div>
      ),
    },
    {
      key: "group",
      header: "Grupo",
      sortable: false,
      width: "150px",
      render: (item) =>
        item.group === "under_group" ? (
          <span>Parte inferior</span>
        ) : (
          <span>Parte superior</span>
        ),
    },
    {
      key: "position",
      header: "Posição",
      sortable: true,
      width: "150px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<quickAccessButtons> = {
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
        setErrors({
          position: false,
          title: false,
          image: false,
          group: false,
          link: false,
        });
        setSelectedItem(item);
        resetForm({
          status: item.status ?? "",
          title: item.title ?? "",
          title_color: item.title_color ?? "",
          image: item.image ?? null,
          position: item.position ?? null,
          link: item.link ?? "",
          group: item.group ?? "",
        });
        setIsEditModalOpen(true);
      },
    },

    delete: {
      confirmMessage: `Tem certeza que deseja excluir este botão de acesso rápido? Esta ação não pode ser desfeita.`,
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

      <QuickAccessButtonsModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleClose}
        title={
          isCreateModalOpen
            ? "Criar botão de acesso rápido"
            : "Editar botão de acesso rápido"
        }
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
        createButton={createButton}
        searchable
        sortable
        pagination
        itemsPerPage={6}
      />
    </>
  );
}

export default QuickAccessButtonsAdmin;
