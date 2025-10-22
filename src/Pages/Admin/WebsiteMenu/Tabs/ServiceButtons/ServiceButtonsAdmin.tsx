import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../../../types/tableTypes";
import React, { useEffect, useState } from "react";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { serviceButtonsForm } from "../../../../../Services/interfaces";
import DOMPurify from "dompurify";
import { servicesButtons } from "../../../../../Components/TableInterfaces";
import style from "./ServiceButtonsAdmin.module.css";
import ServiceButtonsModal from "../../../../../Components/ModalTabs/ServiceButtonsModal";
import {
  patchServiceButtons,
  fetchServiceButtons,
  postServiceButtons,
  removeServiceButtons,
} from "../../../../../Services/Slices/ServiceButtonsSlice";

function ServiceButtonsAdmin() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<servicesButtons | null>(
    null
  );
  const data = useSelector((state: any) => state.serviceButtonsSlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    image: false,
    title: false,
    position: false,
  });
  const initialForm: serviceButtonsForm = {
    status: "published",
    title: "",
    title_color: "#ffffff",
    link: "",
    position: null,
    image: null,
  };
  const [form, setForm] = useState<serviceButtonsForm>(initialForm);

  const resetForm = (custom?: Partial<serviceButtonsForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchServiceButtons());
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

  const handleDelete = async (ServiceButtonsItem: any) => {
    try {
      await dispatch<any>(removeServiceButtons(ServiceButtonsItem.id));
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

  const handleSubmit = async (form: serviceButtonsForm, id?: number) => {
    const newErrors = {
      image: !form.image,
      title: !form.title.trim(),
      position: !form.position,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("title", form.title);
    formData.append("title_color", form.title_color);
    formData.append("link", form.link);
    if (form.position !== null && form.position !== undefined) {
      formData.append("position", String(form.position));
    }

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchServiceButtons(formData, id));
      } else {
        response = await dispatch<any>(postServiceButtons(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar botão de atendimento");
      }

      await dispatch<any>(fetchServiceButtons());

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
    text: "Criar novo Botão de atendimento",
    onClick: () => {
      setErrors({ position: false, title: false, image: false });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  const columns: TableColumn<servicesButtons>[] = [
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
      key: "position",
      header: "Posição",
      sortable: true,
      width: "150px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<servicesButtons> = {
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
        setErrors({ position: false, title: false, image: false });
        setSelectedItem(item);
        resetForm({
          status: item.status ?? "",
          title: item.title ?? "",
          title_color: item.title_color ?? "",
          image: item.image ?? null,
          position: item.position ?? null,
          link: item.link ?? "",
        });
        setIsEditModalOpen(true);
      },
    },

    delete: {
      confirmMessage: `Tem certeza que deseja excluir este botão de atendimento? Esta ação não pode ser desfeita.`,
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

      <ServiceButtonsModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleClose}
        title={
          isCreateModalOpen
            ? "Criar botão de atendimento"
            : "Editar botão de atendimento"
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

export default ServiceButtonsAdmin;
