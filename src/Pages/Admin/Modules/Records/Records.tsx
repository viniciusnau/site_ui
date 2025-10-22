import Table from "../../../../Components/Table/Table";
import style from "./Records.module.css";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
  BooleanColumnConfig,
} from "../../../../types/tableTypes";
import { useEffect, useState } from "react";
import Snackbar from "../../../../Components/Snackbar/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { records } from "../../../../Components/TableInterfaces";
import {
  fetchRecords,
  patchRecords,
  postRecords,
  removeRecords,
} from "../../../../Services/Slices/RecordsSlice";
import { recordsForm } from "../../../../Services/interfaces";
import DOMPurify from "dompurify";
import RecordsModal from "../../../../Components/ModalTabs/RecordsModal";
import { fetchSubcategory } from "../../../../Services/Slices/SubcategorySlice";

function Records() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<records | null>(null);
  const data = useSelector((state: any) => state.recordsSlice.data);
  const category = useSelector((state: any) => state.categorySlice.data);
  const subcategory = useSelector((state: any) => state.subCategorySlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    title: false,
    attachment: false,
    category: false,
  });
  const initialForm: recordsForm = {
    title: "",
    status: "not_published",
    attachment: null,
    category: "",
    sub_category: "",
  };
  const [form, setForm] = useState<recordsForm>(initialForm);

  const resetForm = (custom?: Partial<recordsForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchRecords());
    dispatch<any>(fetchSubcategory());
  }, [dispatch]);

  const handleChange = (value: string, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: DOMPurify.sanitize(value),
    }));
  };

  const handleDelete = async (recordsItem: any) => {
    try {
      await dispatch<any>(removeRecords(recordsItem.id));
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

  const handleSubmit = async (form: recordsForm, id?: number) => {
    const newErrors = {
      title: !form.title.trim(),
      attachment: !form.attachment,
      category: !form.category,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("sub_category", form.sub_category);

    if (form.attachment instanceof File) {
      formData.append("attachment", form.attachment);
    }

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchRecords(formData, id));
      } else {
        response = await dispatch<any>(postRecords(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar Cadastro");
      }

      await dispatch<any>(fetchRecords());

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
      console.error("Erro ao enviar cadastro:", err);
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

  const booleanConfig: BooleanColumnConfig<records> = {
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
    text: "Criar novo cadastro",
    onClick: () => {
      setErrors({
        title: false,
        category: false,
        attachment: false,
      });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Status",
      column: "status" as keyof records,
      options: { published: "Publicado", not_published: "Não publicado" },
      width: "200px",
      multiple: false,
    },
  ];

  const columns: TableColumn<records>[] = [
    {
      key: "title",
      header: "Título",
      sortable: false,
      width: "150px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<records> = {
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
          title: false,
          category: false,
          attachment: false,
        });
        setSelectedItem(item);
        resetForm({
          status: item.status || "",
          title: item.title || "",
          category: item.category || "",
          attachment: item.attachment || null,
          sub_category: item.sub_category || "",
        });
        setIsEditModalOpen(true);
      },
    },

    delete: {
      confirmMessage: `Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.`,
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

      <RecordsModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleClose}
        title={isCreateModalOpen ? "Criar Cadastro" : "Editar Cadastro"}
        form={form}
        setForm={setForm}
        errors={errors}
        setErrors={setErrors}
        onSubmit={() =>
          handleSubmit(form, isEditModalOpen ? selectedItem?.id : undefined)
        }
        mode={isCreateModalOpen ? "create" : "edit"}
        handleChange={handleChange}
        customStyles={style}
        category={category}
        sub_category={subcategory}
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

export default Records;
