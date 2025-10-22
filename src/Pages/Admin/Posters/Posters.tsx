import Table from "../../../Components/Table/Table";
import style from "./Posters.module.css";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
  BooleanColumnConfig,
} from "../../../types/tableTypes";
import React, { useEffect, useState } from "react";
import Snackbar from "../../../Components/Snackbar/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { posters } from "../../../Components/TableInterfaces";
import {
  fetchPosters,
  patchPosters,
  postPosters,
  removePosters,
} from "../../../Services/Slices/PostersSlice";
import { postersForm } from "../../../Services/interfaces";
import PostersModal from "../../../Components/ModalTabs/PostersModal";
import DOMPurify from "dompurify";

function Posters() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<posters | null>(null);
  const data = useSelector((state: any) => state.postersSlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    title: false,
    image: false,
    attachment: false,
  });
  const initialForm: postersForm = {
    title: "",
    status: "not_published",
    description: "",
    image: null,
    attachment: null,
    slug: "",
  };
  const [form, setForm] = useState<postersForm>(initialForm);

  const resetForm = (custom?: Partial<postersForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchPosters());
  }, [dispatch]);

  const handleChange = (value: string, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: DOMPurify.sanitize(value),
    }));
  };

  const handleDelete = async (postersItem: any) => {
    try {
      await dispatch<any>(removePosters(postersItem.id));
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

  const handleSubmit = async (form: postersForm, id?: number) => {
    const newErrors = {
      title: !form.title.trim(),
      image: !form.image,
      attachment: !form.attachment,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }
    if (form.attachment instanceof File) {
      formData.append("attachment", form.attachment);
    }

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchPosters(formData, id));
      } else {
        response = await dispatch<any>(postPosters(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar cartilha");
      }

      await dispatch<any>(fetchPosters());

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
      console.error("Erro ao enviar cartilha:", err);
      const errorMessage = err;

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

  const booleanConfig: BooleanColumnConfig<posters> = {
    enabled: true,
    header: "Status",
    field: "status",
    checkValue: "published",
    xValue: "not_published",
    scheduledValue: "scheduled",
    width: "50px",
    sortable: false,
  };

  const createTag: CreateButtonConfig = {
    text: "Criar nova Cartilha",
    onClick: () => {
      setErrors({ title: false, image: false, attachment: false });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Status",
      column: "status" as keyof posters,
      options: { published: "Publicado", not_published: "Não publicado" },
      width: "200px",
      multiple: false,
    },
  ];

  const columns: TableColumn<posters>[] = [
    {
      key: "title",
      header: "Título",
      sortable: true,
      width: "150px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<posters> = {
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
        window.open(`/servicos/cartilhas-e-revista/${item.slug}`, "_blank");
      },
    },

    edit: {
      onClick: (item) => {
        setErrors({ title: false, image: false, attachment: false });
        setSelectedItem(item);
        resetForm({
          status: item.status || "",
          title: item.title || "",
          description: item.description || "",
          image: item.image || null,
          attachment: item.attachment || null,
        });
        setIsEditModalOpen(true);
      },
    },

    delete: {
      confirmMessage: `Tem certeza que deseja excluir esta Cartilha? Esta ação não pode ser desfeita.`,
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
      <PostersModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleClose}
        title={isCreateModalOpen ? "Criar Cartilha" : "Editar Cartilha"}
        form={form}
        editedHTML={form.description}
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
        createButton={createTag}
        searchable
        sortable
        pagination
        itemsPerPage={6}
      />
    </>
  );
}

export default Posters;
