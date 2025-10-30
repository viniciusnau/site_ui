import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  ActionsColumnConfig,
  BooleanColumnConfig,
  CreateButtonConfig
} from "../../../../../types/tableTypes";
import { useEffect, useState } from "react";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { containerForm } from "../../../../../Services/interfaces";
import DOMPurify from "dompurify";
import { container } from "../../../../../Components/TableInterfaces";
import style from "./Container.module.css";
import {
  fetchContainer,
  patchContainer,
  postContainer,
} from "../../../../../Services/Slices/ContainerSlice";
import ContainerModal from "../../../../../Components/ModalTabs/ContainerModal";

function Container() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<container | null>(null);
  const data = useSelector((state: any) => state.containerSlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    title: false,
  });
  const initialForm: containerForm = {
    status: "published",
    show_title: false,
    title: "",
    background_color: "",
    title_color: "",
    redirect_button: "",
  };
  const [form, setForm] = useState<containerForm>(initialForm);

  const resetForm = (custom?: Partial<containerForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchContainer());
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

  const handleClose = () => {
    resetForm();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSubmit = async (form: containerForm, id?: number) => {
    const newErrors = {
      title: !form.title.trim(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();
    formData.append("status", form.status);
    formData.append("show_title", form.show_title.toString());
    formData.append("title", form.title);
    formData.append("title_color", form.title_color);
    formData.append("redirect_button", form.redirect_button);
    formData.append("background_color", form.background_color);

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchContainer(formData, id));
      } else {
        response = await dispatch<any>(postContainer(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar Container");
      }

      await dispatch<any>(fetchContainer());

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
      console.error("Erro ao enviar Container:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.response?.data?.__all__?.[0] ||
            err?.message ||
            "Erro ao salvar container";

      setSnackbarType(id ? "patchError" : "postError");
      setSnackbarMessage(errorMessage);
      handleClose();
    }
  };

  const booleanConfig: BooleanColumnConfig<container> = {
    enabled: true,
    header: "Está exibindo título",
    field: "show_title",
    checkValue: true,
    xValue: false,
    width: "50px",
    sortable: false,
  };

  const columns: TableColumn<container>[] = [
    {
      key: "title",
      header: "Titulo",
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
      header: "Plano de fundo",
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
      key: "redirect_button",
      header: "Botão de redirecionamento",
      sortable: false,
      width: "150px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<container> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: {
      canView: false,
      canEdit: true,
      canDelete: false,
      canCreate: true,
    },
    view: {
      enabled: false,
      onClick: (item) => {},
    },

    edit: {
      onClick: (item) => {
        setErrors({ title: false });
        setSelectedItem(item);
        resetForm({
          show_title: item.show_title ?? "",
          status: item.status ?? "",
          title: item.title ?? "",
          title_color: item.title_color ?? "",
          background_color: item.background_color ?? "",
          redirect_button: item.redirect_button ?? "",
        });
        setIsEditModalOpen(true);
      },
    },

    delete: {
      enabled: false,
      confirmMessage: `Tem certeza que deseja excluir este container? Esta ação não pode ser desfeita.`,
      onClick: (item) => {},
    },
  };

    /*const createContainer: CreateButtonConfig = {
      text: "Criar novo grupo de container",
      onClick: () => {
        setErrors({ title: false });
        resetForm();
        setIsCreateModalOpen(true);
      },
    };*/
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

      <ContainerModal
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
        actionsColumn={ActionsConfig}
        booleanColumn={booleanConfig}
        searchable
        sortable
        pagination
        itemsPerPage={6}
        //createButton={createContainer}
      />
    </>
  );
}

export default Container;
