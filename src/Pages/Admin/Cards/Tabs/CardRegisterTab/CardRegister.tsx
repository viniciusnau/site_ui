import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig, BooleanColumnConfig,
} from "../../../../../types/tableTypes";
import style from "./CardRegister.module.css";
import {cardRegister, news} from "../../../../../Components/TableInterfaces";
import {
  fetchCardRegister,
  removeCardRegister,
  postCardRegister,
  patchCardRegister,
} from "../../../../../Services/Slices/CardRegisterSlice";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { CardRegisterForm } from "../../../../../Services/interfaces";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CardRegisterModal from "../../../../../Components/ModalTabs/CardRegisterModal";
import DOMPurify from "dompurify";
import dayjs from "dayjs";

function CardRegister() {
  const data = useSelector((state: any) => state.cardRegisterSlice.data);
  const dispatch = useDispatch();
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<cardRegister | null>(null);
  const [errors, setErrors] = useState({
    title: false,
    image: false,
    text: false,
  });

  const initialForm: CardRegisterForm = {
    status: "published",
    title: "",
    subtitle: "",
    scheduled_at: null,
    scheduled_date: null,
    slug: "",
    scheduled_time: null,
    text: "",
    image: null,
    card: null,
  };

  const [form, setForm] = useState<CardRegisterForm>(initialForm);

  const resetForm = (custom?: Partial<CardRegisterForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  const createCardRegister: CreateButtonConfig = {
    text: "Criar novo registro",
    onClick: () => {
      setErrors({ title: false, image: false, text: false });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  useEffect(() => {
    dispatch<any>(fetchCardRegister());
  }, [dispatch]);

  const handleClose = () => {
    resetForm();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleChange = (value: string | number, type: string) => {
    setForm((prev: any) => ({
      ...prev,
      [type]:
          typeof value === "string" ? DOMPurify.sanitize(value) : value,
    }));
  };

  const handleDelete = async (cardRegisterItem: any) => {
    try {
      await dispatch<any>(removeCardRegister(cardRegisterItem.id));
      setSnackbarType("deleteSuccess");
      setSnackbarMessage("");
    } catch (err: any) {
      console.error("Erro ao deletar:", err);
      setSnackbarType("deleteError");
      setSnackbarMessage(err);
    }
  };

  const handleSubmit = async (form: CardRegisterForm, id?: number) => {
    const newErrors = {
      title: !form.title.trim(),
      image: !form.image,
      text: !form.text.trim(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const formData = new FormData();

    formData.append("status", form.status);
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("text", form.text);

    if (form.card) {
      formData.append("card", String(form.card));
    }

    if (form.image instanceof File) {
      formData.append("image", form.image);
    } else if (form.image === null) {
      formData.append("remove_image", "true");
    }

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchCardRegister(formData, id));
      } else {
        response = await dispatch<any>(postCardRegister(formData));
      }

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar registro de card");
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
      console.error("Erro ao enviar registro:", err);
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

  const columns: TableColumn<cardRegister>[] = [
    {
      key: "title",
      header: "Título",
      sortable: false,
      width: "300px",
    },
    {
      key: "card_detail.title",
      header: "Coleção",
      sortable: false,
      width: "300px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<cardRegister> = {
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
      enabled: ((item: any) => Boolean(item.path)) as any,
      onClick: (item) => {
        window.open(`/${item.path}`, "_blank");
      },
    },

    edit: {
      onClick: (item) => {
        setErrors({ title: false, image: false, text: false });
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
          text: item.text || "",
          image: item.image || null,
          card: item.card_detail?.id || null
        });

        setIsEditModalOpen(true);
      },
    },
    delete: {
      confirmMessage: `Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.`,
      onClick: (item) => {
        handleDelete(item);
      },
    },
  };

  const processedData = data.map((item: any) => ({
    ...item,
    card_detail_status: item.card_detail?.status || null,
  }));


  const booleanConfig: BooleanColumnConfig<cardRegister>[] = [
    {
      enabled: true,
      header: "Status",
      field: "card_detail_status",
      checkValue: "published",
      xValue: "not_published",
      scheduledValue: "scheduled",
      width: "50px",
      sortable: false,
    }
  ];

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

          <CardRegisterModal
              isOpen={isCreateModalOpen || isEditModalOpen}
              onClose={handleClose}
              title={isCreateModalOpen ? "Criar Registro" : "Editar Registro"}
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
              customStyles={style}
          />

          <Table
              data={processedData}
              columns={columns}
              actionsColumn={ActionsConfig}
              booleanColumns={booleanConfig}
              createButton={createCardRegister}
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

export default CardRegister;
