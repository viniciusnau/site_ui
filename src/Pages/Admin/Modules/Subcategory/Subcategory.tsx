import Table from "../../../../Components/Table/Table";
import style from "./Subcategory.module.css";
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
import { subCategory } from "../../../../Components/TableInterfaces";
import { subCategoryForm } from "../../../../Services/interfaces";
import Modal from "../../../../Components/Modal/Modal";
import {
  fetchSubcategory,
  patchSubcategory,
  postSubcategory,
  removeSubcategory,
} from "../../../../Services/Slices/SubcategorySlice";
import { fetchCategory } from "../../../../Services/Slices/CategorySlice";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";

function Subcategory() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<subCategory | null>(null);
  const data = useSelector((state: any) => state.subCategorySlice.data);
  const category = useSelector((state: any) => state.categorySlice.data);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    title: false,
    category: false,
  });
  const initialForm: subCategoryForm = {
    title: "",
    status: "published",
    category: "",
  };
  const [form, setForm] = useState<subCategoryForm>(initialForm);

  const resetForm = (custom?: Partial<subCategoryForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch<any>(fetchSubcategory());
    dispatch<any>(fetchCategory());
  }, [dispatch]);

  const handleDelete = async (CategoryItem: any) => {
    try {
      await dispatch<any>(removeSubcategory(CategoryItem.id));
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
      category: !form.category,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;
    try {
      if (id) {
        await dispatch<any>(patchSubcategory(form, id));
        setSnackbarType("patchSuccess");
        setSnackbarMessage("");
        setIsEditModalOpen(false);
      } else {
        await dispatch<any>(postSubcategory(form));
        setSnackbarType("postSuccess");
        setSnackbarMessage("");
        handleClose();
      }

      await dispatch<any>(fetchSubcategory());
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

  const columns: TableColumn<subCategory>[] = [
    {
      key: "category_title",
      header: "Vínculado a categoria",
      sortable: false,
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
      column: "status" as keyof subCategory,
      options: { published: "Publicado", not_published: "Não publicado" },
      width: "200px",
      multiple: false,
    },
  ];

  const ActionsConfig: ActionsColumnConfig<subCategory> = {
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
        setErrors({ title: false, category: false });
        setSelectedItem(item);
        resetForm({
          status: item.status || "",
          title: item.title || "",
          category: item.category || "",
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

  const booleanConfig: BooleanColumnConfig<subCategory> = {
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
    text: "Criar nova Sub categoria",
    onClick: () => {
      setErrors({ title: false, category: false });
      resetForm();
      setIsCreateModalOpen(true);
    },
  };

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          title="Editar Sub categoria"
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
                  <label className={style.label}>Categoria:</label>
                  <FormControl
                    fullWidth
                    className={`${style.mui} ${
                      errors.category ? style.inputError : ""
                    }`}
                  >
                    <InputLabel id="category">Categoria</InputLabel>
                    <Select
                      labelId="category"
                      name="category"
                      label="Categoria"
                      value={form.category || ""}
                      onChange={(e: any) => {
                        handleSelect(e);
                        if (errors.category)
                          setErrors((prev: any) => ({
                            ...prev,
                            category: false,
                          }));
                      }}
                    >
                      {category.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.category && (
                    <p className={style.errorText}>Categoria obrigatória</p>
                  )}
                </div>
                <div className={style.field}>
                  <label className={style.label}>Título:</label>
                  <input
                    className={`${style.input} ${
                      errors.title ? style.inputError : ""
                    }`}
                    value={form.title}
                    placeholder="Digite o nome da Sub categoria"
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
          title="Criar Sub categoria"
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
                  <label className={style.label}>Categoria:</label>
                  <FormControl
                    fullWidth
                    className={`${style.mui} ${
                      errors.category ? style.inputError : ""
                    }`}
                  >
                    <InputLabel id="state">Categoria</InputLabel>
                    <Select
                      labelId="category"
                      name="category"
                      label="Categoria"
                      value={form.category || ""}
                      onChange={(e: any) => {
                        handleSelect(e);
                        if (errors.category)
                          setErrors((prev: any) => ({
                            ...prev,
                            category: false,
                          }));
                      }}
                    >
                      {category.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.category && (
                    <p className={style.errorText}>Categoria obrigatória</p>
                  )}
                </div>
                <div className={style.field}>
                  <label className={style.label}>Título:</label>
                  <input
                    className={`${style.input} ${
                      errors.title ? style.inputError : ""
                    }`}
                    value={form.title}
                    placeholder="Digite o título da Sub categoria"
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

export default Subcategory;
