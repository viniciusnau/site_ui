import React, { useEffect, useState } from "react";
import Table from "../../../../../Components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../../../types/tableTypes";
import {
  fetchTag,
  postTag,
  patchTag,
  removeTag,
} from "../../../../../Services/Slices/TagSlice";
import style from "./Tag.module.css";
import { tags } from "../../../../../Components/TableInterfaces";
import Modal from "../../../../../Components/Modal/Modal";
import { sanitize } from "../../../../../Components/Helper";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";

function Tag() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<tags | null>(null);
  const data = useSelector((state: any) => state.tagSlice.data);
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    name_tag: "",
    status: "published",
  });

  useEffect(() => {
    dispatch<any>(fetchTag());
  }, [dispatch]);

  useEffect(() => {
    setError("");
  }, [isCreateModalOpen, isEditModalOpen]);

  const createTag: CreateButtonConfig = {
    text: "Criar nova Tag",
    onClick: () => {
      setForm({ name_tag: "", status: "published" });
      setIsCreateModalOpen(true);
      setError("")
    },
  };

  const handleChange = (value: string, type: "name_tag") => {
    setForm((prev) => ({
      ...prev,
      [type]: sanitize(value),
    }));
    if (error && value.trim()) {
        setError("");
      }
  };

  const handleClose = () => {
    setForm({ name_tag: "", status: "published" });
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch<any>(removeTag(id));
      setSnackbarType("deleteSuccess");
    } catch (err: any) {
      console.error("Erro ao deletar:", err);
      setSnackbarType("deleteError");
    }
  };

  const handleSubmit = async (form: any, id?: number) => {
    if (!form.name_tag.trim()) {
      setError("Nome da tag é obrigatório");
      return;
    }
    setError("");
    try {
      if (id) {
        await dispatch<any>(patchTag(form, id));
        setSnackbarType("patchSuccess");
        setSnackbarMessage("")
        setIsEditModalOpen(false);
      } else {
        await dispatch<any>(postTag(form));
        setSnackbarType("postSuccess");
        setSnackbarMessage("")
        handleClose();
      }
    } catch (err: any) {
      console.error("Erro ao enviar tag:", err);
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

  const columns: TableColumn<tags>[] = [
    {
      key: "name_tag",
      header: "Nome",
      sortable: true,
      width: "300px",
    },
    {
      key: "times_used",
      header: "Notícias vinculadas",
      sortable: true,
      width: "150px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<tags> = {
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
        setSelectedItem(item);
        setIsEditModalOpen(true);
        setError("")
        setForm({
          status: item.status || "",
          name_tag: item.name_tag || "",
        });
      },
    },

    delete: {
      confirmMessage: `Tem certeza que deseja excluir essa Tag? Esta ação não pode ser desfeita.`,
      onClick: (item) => {
        handleDelete(item.id);
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

      {isEditModalOpen && (
        <Modal
          withBackground
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          customStyles={style}
          title="Editar Tag"
        >
          <div className={style.modalContainer}>
            <div className={style.modalContentContainer}>
              <div className={style.modalBodyContainer}>
                <div className={style.field}>
                  <label className={style.label}>Nome:</label>
                  <input
                    className={`${style.input} ${error ? style.inputError : ''}`}
                    value={form.name_tag}
                    placeholder="Digite o nome da Tag"
                    onChange={(e) => handleChange(e.target.value, "name_tag")}
                  />
                  {error && <p className={style.errorText}>{error}</p>}
                </div>
                <div className={style.modalButtonContainer}>
                  <button
                    className={style.button}
                    onClick={() => handleSubmit(form, selectedItem?.id)}
                  >
                    Salvar
                  </button>
                  <button
                    className={`${style.button} ${style.cancel}`}
                    onClick={handleClose}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal
          withBackground
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
          customStyles={style}
          title="Criar Tag"
        >
          <div className={style.modalContainer}>
            <div className={style.modalContentContainer}>
              <div className={style.modalBodyContainer}>
                <div className={style.field}>
                  <label className={style.label}>Nome:</label>
                  <div>
                  <input
                    className={`${style.input} ${error ? style.inputError : ''}`}
                    value={form.name_tag}
                    placeholder="Digite o nome da Tag"
                    onChange={(e) => handleChange(e.target.value, "name_tag")}
                  />
                    {error && <p className={style.errorText}>{error}</p>}
                </div>
                </div>
                <div className={style.modalButtonContainer}>
                  <button
                    className={style.button}
                    onClick={() => handleSubmit(form)}
                  >
                    Criar
                  </button>
                  <button
                    className={`${style.button} ${style.cancel}`}
                    onClick={handleClose}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <Table
        data={data}
        columns={columns}
        actionsColumn={ActionsConfig}
        createButton={createTag}
        searchable
        sortable
        pagination
        itemsPerPage={6}
      />
    </>
  );
}

export default Tag;
