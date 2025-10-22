import React, { useState, useEffect } from "react";
import Table from "../../../Components/Table/Table";
import {
  TableColumn,
  BooleanColumnConfig,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../types/tableTypes";
import { faq } from "../../../Components/TableInterfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFaq,
  patchFaq,
  postFaq,
  removeFaq,
} from "../../../Services/Slices/FAQSlice";
import { fetchUsersByModel } from "../../../Services/Slices/UsersByModelSlice";
import { sanitize } from "../../../Components/Helper";
import Snackbar from "../../../Components/Snackbar/Snackbar";
import Modal from "../../../Components/Modal/Modal";
import style from "./FAQPage.module.css";

function FAQPage() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.FAQSlice.data);
  const usersData = useSelector((state: any) => state.usersByModelSlice.data);
  const [selectedItem, setSelectedItem] = useState<faq | null>(null);
  const [errors, setErrors] = useState({
    question: "",
    answer: ""
  });
  const [form, setForm] = useState({
    status: "not_published", 
    question: "",
    answer: "",
  });

  useEffect(() => {
    dispatch<any>(fetchFaq());
    dispatch<any>(fetchUsersByModel("faq"));
  }, [dispatch]);

   useEffect(() => {
    setErrors({ question: "", answer: "" });
  }, [isCreateModalOpen, isEditModalOpen]);


  const handleChange = (value: string, type: "question" | "answer") => {
    setForm((prev) => ({
      ...prev,
      [type]: sanitize(value),
    }));
    if (errors[type] && value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [type]: ""
      }));
    }
  };

  const authorOptions = usersData.map((user: any) => ({
    label: user.name,
    value: user.id.toString(),
  }));
  
  const authorOptionsDict = authorOptions.reduce((acc: any, item: any) => {
    acc[item.value] = item.label;
    return acc;
  }, {} as Record<string, string>);

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Status",
      column: "status" as keyof faq,
      options: { published: "Publicado", not_published: "Não Publicado" },
      width: "200px",
      multiple: false,
    },
    {
      enabled: true,
      label: "Autor",
      column: "author" as keyof faq,
      options: authorOptionsDict,
      width: "200px",
      multiple: true,
    },
  ];

  const createFAQButton: CreateButtonConfig = {
    text: "Criar novo FAQ",
    onClick: () => {
      setForm({ status: "not_published", answer: "", question: "" });
      setIsCreateModalOpen(true);
      setErrors({ question: "", answer: "" });
    },
  };

  const booleanConfig: BooleanColumnConfig<faq> = {
    enabled: true,
    header: "Status",
    field: "status",
    checkValue: "published",
    xValue: "not_published",
    width: "50px",
    sortable: true,
  };

  const columns: TableColumn<faq>[] = [
    {
      key: "question",
      header: "Pergunta",
      sortable: true,
      width: "300px",
    },
    {
      key: "author_name",
      header: "Autor",
      sortable: true,
      width: "200px",
    },
  ];

  const ActionsConfig: ActionsColumnConfig<faq> = {
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
        setSelectedItem(item);
        setIsViewModalOpen(true);
      },
    },

    edit: {
      onClick: (item) => {
        setSelectedItem(item);
        setForm({
          status: item.status,
          answer: item.answer || "",
          question: item.question || "",
        });
        setIsEditModalOpen(true);
        setErrors({ question: "", answer: "" });
      },
    },
    delete: {
      confirmMessage: `Tem certeza que deseja excluir esta Pergunta? Esta ação não pode ser desfeita.`,
      onClick: (item) => {
        dispatch<any>(removeFaq(item.id));
      },
    },
  };

  const handleDelete = () => {
  };
  
  const handleClose = () => {
    setForm({
      status: "not_published",
      answer: "",
      question: "",
    });
    setIsCreateModalOpen(false);
    setErrors({ question: "", answer: "" })
  };

  const handleSubmit = (form: any, id?: number) => {
    const newErrors = {
      question: "",
      answer: ""
    };

    if (!form.question.trim()) {
      newErrors.question = "A pergunta é obrigatória";
    }

    if (!form.answer.trim()) {
      newErrors.answer = "A resposta é obrigatória";
    }
     if (newErrors.question || newErrors.answer) {
      setErrors(newErrors);
      return;
    }
    setErrors({ question: "", answer: "" });

    if (id) {
      setSnackbarType("patchSuccess");
      dispatch<any>(patchFaq(form, id));
      setIsEditModalOpen(false);
    } else {
      setSnackbarType("postSuccess");
      dispatch<any>(postFaq(form));
      handleClose();
    }
  };
  
  return (
    <>
      {snackbarType === "noneChange" && (
        <Snackbar type="noneChange" setSnackbarType={setSnackbarType} />
      )}
      {snackbarType === "postSuccess" && (
        <Snackbar type="postSuccess" setSnackbarType={setSnackbarType} />
      )}
      {snackbarType === "patchSuccess" && (
        <Snackbar type="patchSuccess" setSnackbarType={setSnackbarType} />
      )}
      {isViewModalOpen && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          withBackground
          customStyles={style}
          title="Visualizar FAQ"
        >
          {selectedItem && (
            <div className={style.modalContainer}>
              <div className={style.modalContentContainer}>
                <div className={style.field}>
                  <label className={style.label}>Pergunta:</label>
                  <div className={style.modalTextContainer}>
                    <span className={style.modalText}>
                      {selectedItem.question}
                    </span>
                  </div>
                </div>
                <div className={style.field}>
                  <label className={style.label}>Resposta:</label>
                  <div className={style.modalTextContainer}>
                    <span className={style.modalText}>
                      {selectedItem.answer}
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.modalButtonContainer}>
                <button
                  className={style.button}
                  onClick={() => setIsViewModalOpen(false)}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          withBackground
          customStyles={style}
          title="Criar FAQ"
        >
          <div className={style.modalContainer}>
            <div className={style.modalContentContainer}>
              <div className={style.field}>
                <label className={style.label}>Publicar:</label>
                <div className={style.checkboxContainer}>
                  {["published", "not_published"].map((value) => (
                    <div key={value} className={style.checkboxBackground}>
                      <label className={style.checkboxLabel}>
                        <input
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
                          className={style.inputCheckbox}
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
                <label className={style.label}>Pergunta:</label>
                <div className={style.modalTextContainer}>
                  <textarea
                    className={`${style.input} ${errors.question ? style.inputError : ''}`}
                    value={form.question}
                    placeholder="Digite a pergunta do FAQ"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e.target.value, "question")
                    }
                  ></textarea>
                  {errors.question && (
                    <p className={style.errorText}>{errors.question}</p>
                  )}
                </div>
              </div>
              <div className={style.field}>
                <label className={style.label}>Resposta:</label>
                <div className={style.modalTextContainer}>
                  <textarea
                    className={`${style.input} ${errors.answer ? style.inputError : ''}`}
                    value={form.answer}
                    placeholder="Digite a resposta do FAQ"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e.target.value, "answer")
                    }
                  ></textarea>
                  {errors.answer && (
                    <p className={style.errorText}>{errors.answer}</p>
                  )}
                </div>
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
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          withBackground
          customStyles={style}
          title="Editar FAQ"
        >
          <div className={style.modalContainer}>
            <div className={style.modalContentContainer}>
              <div className={style.field}>
                <label className={style.label}>Publicar:</label>
                <div className={style.checkboxContainer}>
                  {["published", "not_published"].map((value) => (
                    <div key={value} className={style.checkboxBackground}>
                      <label className={style.checkboxLabel}>
                        <input
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
                          className={style.inputCheckbox}
                        />
                        <p className={style.checkboxText}>
                          {value === "published"
                            ? "Publicar"
                            : value === "not_published"
                            ? "Não publicar"
                            : value === "scheduled"
                            ? "Agendar"
                            : "-"}
                        </p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.field}>
                <label className={style.label}>Pergunta:</label>
                <div className={style.modalTextContainer}>
                  <textarea
                    className={`${style.input} ${errors.question ? style.inputError : ''}`}
                    value={form.question}
                    placeholder="Digite a pergunta do FAQ"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e.target.value, "question")
                    }
                  ></textarea>
                  {errors.question && (
                    <p className={style.errorText}>{errors.question}</p>
                  )}
                </div>
              </div>
              <div className={style.field}>
                <label className={style.label}>Resposta:</label>
                <div className={style.modalTextContainer}>
                  <textarea
                    className={`${style.input} ${errors.answer ? style.inputError : ''}`}
                    value={form.answer}
                    placeholder="Digite a resposta do FAQ"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e.target.value, "answer")
                    }
                  ></textarea>
                  {errors.answer && (
                    <p className={style.errorText}>{errors.answer}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={style.modalButtonContainer}>
              <button
                className={style.button}
                onClick={() => handleSubmit(form, selectedItem?.id)}
              >
                salvar
              </button>
              <button
                className={`${style.button} ${style.cancel}`}
                onClick={() => {
                  handleClose(); 
                  setIsEditModalOpen(false); 
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Table
        data={data}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={booleanConfig}
        actionsColumn={ActionsConfig}
        genericFilters={genericFiltersConfig}
        createButton={createFAQButton}
        searchable
        sortable
        pagination
        itemsPerPage={6}
      />
    </>
  );
}


export default FAQPage;
