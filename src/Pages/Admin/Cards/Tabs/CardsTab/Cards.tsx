import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../../../types/tableTypes";
import style from "./Cards.module.css";
import {
  fetchCards,
  removeCards,
  postCards,
  patchCards,
} from "../../../../../Services/Slices/CardsSlice";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CardsModal from "../../../../../Components/ModalTabs/CardsModal";
import { cardsForm } from "../../../../../Services/interfaces";
import DOMPurify from "dompurify";

function Cards() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.cardsSlice.data);

  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [errors, setErrors] = useState({ title: false });

  const initialForm: cardsForm = { status: "published", title: "" };
  const [form, setForm] = useState<cardsForm>(initialForm);

  const resetForm = (custom?: Partial<cardsForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchCards());
  }, [dispatch]);

  const createCards: CreateButtonConfig = {
    text: "Criar nova coleção",
    onClick: () => {
      setErrors({ title: false });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDelete = async (card: any) => {
    try {
      await dispatch<any>(removeCards(card.id));
      setSnackbarType("deleteSuccess");
      setSnackbarMessage("Coleção deletada com sucesso!");
    } catch (err: any) {
      setSnackbarType("deleteError");
      setSnackbarMessage(err?.message || "Erro ao deletar coleção");
    }
  };

  const handleSubmit = async (id?: number) => {
    if (!form.title.trim()) {
      setSnackbarType("postError");
      setSnackbarMessage("O título é obrigatório!");
      return;
    }

    try {
      let response;
      if (id) {
        response = await dispatch<any>(patchCards({ title: form.title }, id));
      } else {
        response = await dispatch<any>(postCards({ title: form.title, status: "published" }));
      }

      if (response?.error) throw new Error("Erro ao salvar coleção");

      setSnackbarType(id ? "patchSuccess" : "postSuccess");
      setSnackbarMessage(
          id ? "Card atualizado com sucesso!" : "Card criado com sucesso!"
      );
      handleClose();
    } catch (err: any) {
      setSnackbarType(id ? "patchError" : "postError");
      setSnackbarMessage(err?.message || "Erro ao salvar card");
    }
  };

  const handleChange = (value: string, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: DOMPurify.sanitize(value),
    }));
    if (errors[type as keyof typeof errors])
      setErrors((prev) => ({ ...prev, [type]: false }));
  };

  const columns: TableColumn<any>[] = [
    { key: "title", header: "Título", sortable: true, width: "300px" },
  ];

  const ActionsConfig: ActionsColumnConfig<any> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: { canView: true, canEdit: true, canDelete: true, canCreate: true },
    view: {
      enabled: ((item: any) => Boolean(item.path)) as any,
      onClick: (item) => {
        window.open(`/${item.path}`, "_blank");
      },
    },
    edit: {
      enabled: true,
      onClick: (item) => {
        setSelectedItem(item);
        resetForm({ title: item.title || "" });
        setIsEditModalOpen(true);
      },
    },
    delete: {
      confirmMessage: "Tem certeza que deseja excluir este card?",
      onClick: handleDelete,
    },
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}>
        {["noneChange","postSuccess","postError","patchSuccess","patchError","deleteSuccess","deleteError"].map((type) =>
            snackbarType === type ? (
                <Snackbar
                    key={type}
                    type={type as any}
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            ) : null
        )}

        <CardsModal
            isOpen={isCreateModalOpen || isEditModalOpen}
            onClose={handleClose}
            form={form}
            setForm={setForm}
            title={isCreateModalOpen ? "Criar Coleção" : "Editar Coleção"}
            customStyles={style}
            mode={isCreateModalOpen ? "create" : "edit"}
            onSubmit={() =>
                handleSubmit(isEditModalOpen ? selectedItem?.id : undefined)
            }
            handleChange={handleChange}
            errors={errors}
            setErrors={setErrors}
        />

        <Table
            data={data}
            columns={columns}
            actionsColumn={ActionsConfig}
            createButton={createCards}
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
  );
}

export default Cards;
