import Table from "../../../../Components/Table/Table";
import style from "./Category.module.css";
import {
  TableColumn,
  ActionsColumnConfig,
  CreateButtonConfig,
  BooleanColumnConfig,
} from "../../../../types/tableTypes";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import Snackbar from "../../../../Components/Snackbar/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { category } from "../../../../Components/TableInterfaces";
import { categoryForm } from "../../../../Services/interfaces";
import Modal from "../../../../Components/Modal/Modal";
import {
  fetchCategory,
  patchCategory,
  postCategory,
  removeCategory,
} from "../../../../Services/Slices/CategorySlice";

function Category() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<category | null>(null);
  const data = useSelector((state: any) => state.categorySlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    title: false,
  });
  const initialForm: categoryForm = {
    title: "",
    status: "published",
    description: "",
  };
  const [form, setForm] = useState<categoryForm>(initialForm);

  const resetForm = (custom?: Partial<categoryForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchCategory());
  }, [dispatch]);

  const handleDelete = async (CategoryItem: any) => {
    try {
      await dispatch<any>(removeCategory(CategoryItem.id));
      setSnackbarType("deleteSuccess");
      setSnackbarMessage("");
    } catch (err: any) {
      console.error("Erro ao deletar:", err);
      setSnackbarType("deleteError");
      setSnackbarMessage(err);
    }
  };

  const handleChange = (value: string, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: DOMPurify.sanitize(value),
    }));
  };

  const handleClose = () => {
    resetForm();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSubmit = async (form: any, id?: number) => {
    const newErrors = {
      title: !form.title.trim(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;
    try {
      if (id) {
        await dispatch<any>(patchCategory(form, id));
        setSnackbarType("patchSuccess");
        setSnackbarMessage("");
        setIsEditModalOpen(false);
      } else {
        await dispatch<any>(postCategory(form));
        setSnackbarType("postSuccess");
        setSnackbarMessage("");
        handleClose();
      }

      await dispatch<any>(fetchCategory());
    } catch (err: any) {
      console.error("Erro ao enviar categoria:", err);
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

  const columns: TableColumn<category>[] = [
    {
      key: "records_count",
      header: "Quantidade de cadastros",
      sortable: true,
      width: "150px",
    },
    {
      key: "title",
      header: "Título",
      sortable: true,
      width: "150px",
    },
  ];

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Status",
      column: "status" as keyof category,
      options: { published: "Publicado", not_published: "Não publicado" },
      width: "200px",
      multiple: false,
    },
  ];

  const ActionsConfig: ActionsColumnConfig<category> = {
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
        window.open(`modulos/teste/${item.id}`, "_self"); 
      },
    },

    edit: {
      onClick: (item) => {
        setErrors({ title: false });
        setSelectedItem(item);
        resetForm({
          status: item.status || "",
          title: item.title || "",
          description: item.description || "",
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

  const booleanConfig: BooleanColumnConfig<category> = {
    enabled: true,
    header: "Status",
    field: "status",
    checkValue: "published",
    xValue: "not_published",
    width: "50px",
    sortable: false,
  };

  const createTag: CreateButtonConfig = {
    text: "Criar nova categoria",
    onClick: () => {
      setErrors({ title: false });
      resetForm();
      setIsCreateModalOpen(true);
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
          title="Editar Categoria"
        >
          <div className={style.modalContainer}>
            <div className={style.modalContentContainer}>
              <div className={style.modalBodyContainer}>
                <div className={style.field}>
                  <label className={style.label}>Publicar:</label>
                  <div className={style.checkboxContainer}>
                    {["published", "not_published"].map((value) => (
                      <div className={style.checkboxBackground}>
                        <label key={value} className={style.checkboxLabel}>
                          <input
                            className={style.inputCheckbox}
                            type="radio"
                            name="status"
                            value={value}
                            checked={form.status === value}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                          />
                          <p className={style.checkboxText}>
                            {value === "published"
                              ? "Publicar"
                              : value === "not_published"
                              ? "Não publicar"
                              : "-"}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={style.field}>
                  <label className={style.label}>Título:</label>
                  <input
                    className={`${style.input} ${
                      errors.title ? style.inputError : ""
                    }`}
                    value={form.title}
                    placeholder="Digite o nome da categoria"
                    onChange={(e) => {
                      handleChange(e.target.value, "title");
                      if (errors.title)
                        setErrors((prev: any) => ({ ...prev, title: false }));
                    }}
                  />
                  {errors.title && (
                    <p className={style.errorText}>Título obrigatório</p>
                  )}
                </div>
                <div className={style.field}>
                  <label className={style.label}>Descrição:</label>
                  <textarea
                    className={style.textarea}
                    value={form.description}
                    placeholder="Adicione uma descrição"
                    onChange={(e) =>
                      handleChange(e.target.value, "description")
                    }
                  />
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
          title="Criar Categoria"
        >
          <div className={style.modalContainer}>
            <div className={style.modalContentContainer}>
              <div className={style.modalBodyContainer}>
                <div className={style.field}>
                  <label className={style.label}>Publicar:</label>
                  <div className={style.checkboxContainer}>
                    {["published", "not_published"].map((value) => (
                      <div className={style.checkboxBackground}>
                        <label key={value} className={style.checkboxLabel}>
                          <input
                            className={style.inputCheckbox}
                            type="radio"
                            name="status"
                            value={value}
                            checked={form.status === value}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                          />
                          <p className={style.checkboxText}>
                            {value === "published"
                              ? "Publicar"
                              : value === "not_published"
                              ? "Não publicar"
                              : "-"}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={style.field}>
                  <label className={style.label}>Nome:</label>
                  <input
                    className={`${style.input} ${
                      errors.title ? style.inputError : ""
                    }`}
                    value={form.title}
                    placeholder="Digite o nome da categoria"
                    onChange={(e) => {
                      handleChange(e.target.value, "title");
                      if (errors.title)
                        setErrors((prev: any) => ({ ...prev, title: false }));
                    }}
                  />
                  {errors.title && (
                    <p className={style.errorText}>Título obrigatório</p>
                  )}
                </div>
                <div className={style.field}>
                  <label className={style.label}>Descrição:</label>
                  <textarea
                    className={style.textarea}
                    value={form.description}
                    placeholder="Adicione uma descrição"
                    onChange={(e) =>
                      handleChange(e.target.value, "description")
                    }
                  />
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

export default Category;
