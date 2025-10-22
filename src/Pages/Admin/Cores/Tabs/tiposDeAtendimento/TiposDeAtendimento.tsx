import React, { useState, useEffect } from "react";
import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  BooleanColumnConfig,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../../../types/tableTypes";
import { typeOfService } from "../../../../../Components/TableInterfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTypeOfService,
  patchTypeOfService,
  postTypeOfService,
  removeTypeOfService,
} from "../../../../../Services/Slices/TypeOfServiceSlice";
import Modal from "../../../../../Components/Modal/Modal";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { sanitize } from "../../../../../Components/Helper";
import style from "./TiposDeAtendimento.module.css";

function TiposDeAtendimento() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [snackbarType, setSnackbarType] = useState<string | null>(null);
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.typeOfService.data);
    const [selectedItem, setSelectedItem] = useState<typeOfService | null>(null);
    const [error, setError] = useState<string>("");
    const [form, setForm] = useState({
      status: "not_published",
      service_name: "",
    });
    useEffect(() => {
      dispatch<any>(fetchTypeOfService());
    }, [dispatch]);

    useEffect(() => {
      setError("");
    }, [isCreateModalOpen, isEditModalOpen]);
  
    const createFAQButton: CreateButtonConfig = {
      text: "Criar Tipo de serviço",
      onClick: () => {
        setForm({ status: "not_published", service_name: "" });
        setIsCreateModalOpen(true);
        setError("")
      },
    };
  
    const genericFiltersConfig = [
      {
        enabled: true,
        label: "Status",
        column: "status" as keyof typeOfService,
        options: { published: "Publicado", not_published: "Não Publicado" },
        width: "200px",
        multiple: false,
      },
    ];
  
    const booleanConfig: BooleanColumnConfig<typeOfService> = {
      enabled: true,
      header: "Status",
      field: "status",
      checkValue: "published",
      xValue: "not_published",
      width: "50px",
      sortable: true,
    };
  
    const columns: TableColumn<typeOfService>[] = [
      {
        key: "service_name",
        header: "Tipos de serviço",
        sortable: true,
        width: "300px",
      },
    ];
  
    const ActionsConfig: ActionsColumnConfig<typeOfService> = {
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
          setForm({
            status: item.status,
            service_name: item.service_name || "",
          });
          setIsEditModalOpen(true);
          setError("")
        },
      },
      delete: {
        confirmMessage: `Tem certeza que deseja excluir este Tipo de atendimento? Esta ação não pode ser desfeita.`,
        onClick: (item) => {
          dispatch<any>(removeTypeOfService(item.id));
        },
      },
    };
  
    const handleChange = (value: string, type: "service_name") => {
      setForm((prev) => ({
        ...prev,
        [type]: sanitize(value),
      }));
      if (error && value.trim()) {
        setError("");
      }
    };

    const handleDelete = () => {
    };
  
    const handleSubmit = (form: any, id?: number) => {
      if (!form.service_name.trim()) {
        setError("Nome do serviço é obrigatório");
        return;
      }
      setError("")
  
      if (id) {
        setSnackbarType("patchSuccess");
        dispatch<any>(patchTypeOfService(form, id));
        setIsEditModalOpen(false);
      } else {
        setSnackbarType("postSuccess");
        dispatch<any>(postTypeOfService(form));
        handleClose();
      }
    };

    const handleClose = () => {
      setForm({
        status: "not_published",
        service_name: "",
      });
      setIsCreateModalOpen(false);
      setError("");
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
      {isCreateModalOpen && (
        <Modal
          withBackground
          onClose={() => setIsCreateModalOpen(false)}
          isOpen={isCreateModalOpen}
          customStyles={style}
          title="Criar tipo de serviço"
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
                <label className={style.label}>Serviço:</label>
                <div className={style.modalTextContainer}>
                  <input
                    className={`${style.input} ${error ? style.inputError : ''}`}
                    value={form.service_name}
                    placeholder="Digite o tipo de serviço"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e.target.value, "service_name")
                    }
                  />
                  {error && (
                <p className={style.errorText}>{error}</p>
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
          title="Editar Tipo de serviço"
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
                <label className={style.label}>Serviço:</label>
                <div className={style.modalTextContainer}>
                  <input
                    className={`${style.input} ${error ? style.inputError : ''}`}
                    value={form.service_name}
                    placeholder="Digite o tipo de serviço"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e.target.value, "service_name")
                    }
                  />
                  {error && (
                <p className={style.errorText}>{error}</p>
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
        createButton={createFAQButton}
        genericFilters={genericFiltersConfig}
        searchable
        sortable
        pagination
        itemsPerPage={6}
      />
    </>
  );
}

export default TiposDeAtendimento