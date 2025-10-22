import React, { useState, useEffect } from "react";
import Table from "../../../../../Components/Table/Table";
import {
  TableColumn,
  BooleanColumnConfig,
  ActionsColumnConfig,
  CreateButtonConfig,
} from "../../../../../types/tableTypes";
import { core, unit } from "../../../../../Components/TableInterfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnit,
  patchUnit,
  postUnit,
  removeUnit,
} from "../../../../../Services/Slices/UnitSlice";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { sanitize } from "../../../../../Components/Helper";
import style from "./Unidades.module.css";
import { fetchCore } from "../../../../../Services/Slices/CoreSlice";
import { SelectChangeEvent } from "@mui/material/Select";
import { stateItens } from "../../../../../Components/Consts";
import { fetchAreaOfDuty } from "../../../../../Services/Slices/AreaOfDutySlice";
import { fetchTypeOfService } from "../../../../../Services/Slices/TypeOfServiceSlice";
import UnitModal from "../../../../../Components/ModalTabs/UnitModal";
import Modal from "../../../../../Components/Modal/Modal";

export type InputType = "cep" | "phone" | "email" | "url";

function Unidades() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.unit.data);
  const cores = useSelector((state: any) => state.coreSlice.data);
  const areas = useSelector((state: any) => state.areaOfDuty.data);
  const service = useSelector((state: any) => state.typeOfService.data);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVisualizeModalOpen, setIsVisualizeModalOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<unit | null>(null);
  
  const [errors, setErrors] = useState({
    unit_name: false,
    core: false,         
    area_of_duty: false,  
  });
  
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const initialForm: unit = {
    status: "not_published",
    unit_name: "",
    core: "",
    url: "",
    observation: "",
    description: "",
    name_dp: "",
    email_dp: "",
    cep: "",
    street: "",
    district: "",
    city: "",
    state: "",
    contacts: [{ phone: "", is_whatsapp: false, department: "" }],
    emails: [{ email: "" }],
    services: [{ type_of_service: 0, schedules: "" }],
    area_of_duty: [],
    link_schedule_service: "",
    is_principal: false,
  };

  const [form, setForm] = useState<unit>(initialForm);

  useEffect(() => {
    dispatch<any>(fetchUnit());
    dispatch<any>(fetchCore());
    dispatch<any>(fetchAreaOfDuty());
    dispatch<any>(fetchTypeOfService());
  }, [dispatch]);

  const resetForm = (custom?: Partial<unit>) => {
    setForm({ ...initialForm, ...custom });
    setErrors({ 
      unit_name: false,
      core: false,
      area_of_duty: false 
    });
  };

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mapOrDefault = <T,>(
    arr: T[] | undefined,
    mapper: (item: T) => T,
    fallback: T[]
  ) => (arr?.length ? arr.map(mapper) : fallback);

  const createFAQButton: CreateButtonConfig = {
    text: "Criar nova Unidade",
    onClick: () => {
      resetForm({ state: "santa_catarina" });
      setErrors({ 
        unit_name: false,
        core: false,
        area_of_duty: false 
      });
      setIsCreateModalOpen(true);
    },
  };

  const addField = <K extends keyof unit>(key: K, value?: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: [...(prev[key] as any[]), value ?? (initialForm[key] as any[])[0]],
    }));
  };

  const removeField = <K extends keyof unit>(key: K, index: number) => {
    setForm((prev) => ({
      ...prev,
      [key]: (prev[key] as any[]).filter((_, i) => i !== index),
    }));
  };

  const formatInput = (value: string, type: InputType): string => {
    switch (type) {
      case "cep":
        return value
          .replace(/\D/g, "")
          .replace(/^(\d{5})(\d{1,3})$/, "$1-$2")
          .slice(0, 9);

      case "phone":
        return value
          .replace(/\D/g, "")
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d{4})$/, "$1-$2")
          .slice(0, 15);

      case "email":
        return value.toLowerCase().trim();

      case "url":
        let url = value.trim();
        if (url && !/^https?:\/\//i.test(url)) {
          url = "https://defensoria.sc.def.br/unidades/" + url;
        }
        return url;

      default:
        return value;
    }
  };

  type Path = keyof typeof form | [keyof typeof form, number, string];

  const handleChange = (
    path: Path,
    value: string | number | boolean,
    inputType?: InputType
  ) => {
    if (path === "unit_name" && errors.unit_name) {
      setErrors(prev => ({
        ...prev,
        unit_name: false
      }));
    }
    
    if (path === "core" && errors.core) {
      setErrors(prev => ({
        ...prev,
        core: false
      }));
    }

    setForm((prev) => {
      const formattedValue =
        typeof value === "string" && inputType
          ? sanitize(formatInput(value, inputType))
          : typeof value === "string"
          ? sanitize(value)
          : value;

      if (Array.isArray(path)) {
        const [arrayKey, index, field] = path;
        const updatedArray = [...(prev[arrayKey] as any[])];
        updatedArray[index] = {
          ...updatedArray[index],
          [field]: formattedValue,
        };
        return { ...prev, [arrayKey]: updatedArray };
      }

      return {
        ...prev,
        [path]: formattedValue,
      };
    });
  };

  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Status",
      column: "status" as keyof unit,
      options: { published: "Publicado", not_published: "Não Publicado" },
      width: "200px",
      multiple: false,
    },
    {
      enabled: true,
      label: "Núcleo",
      column: "core" as keyof unit,
      options: cores.reduce((acc: Record<string, string>, item: core) => {
        acc[item.id] = item.core_name;
        return acc;
      }, {}),
      width: "200px",
      multiple: true,
    },
  ];

  const booleanConfig: BooleanColumnConfig<unit>[] = [
    {
      enabled: true,
      header: "Status",
      field: "status",
      checkValue: "published",
      xValue: "not_published",
      width: "50px",
      sortable: true,
    },
    {
      enabled: true,
      header: "Principal",
      field: "is_principal",
      checkValue: true,
      xValue: false,
      width: "50px",
      sortable: true,
    },
  ];

  const columns: TableColumn<unit>[] = [
    {
      key: "unit_name",
      header: "Unidade",
      sortable: true,
      width: "300px",
    },
    {
      key: "core",
      header: "Núcleo",
      sortable: true,
      width: "200px",
      render: (item: unit) => getCoreName(item.core),
    },
  ];

  const getCoreName = (coreId: any) => {
    const coreItem = cores.find((c: any) => c.id === coreId);
    return coreItem ? coreItem.core_name : "-";
  };

  const ActionsConfig: ActionsColumnConfig<unit> = {
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
        setIsVisualizeModalOpen(true);
      },
    },
    edit: {
      onClick: (item) => {
        setSelectedItem(item);
        resetForm({
          ...item,
          contacts: mapOrDefault(item.contacts, (c) => c, initialForm.contacts),
          emails: mapOrDefault(item.emails, (e) => e, initialForm.emails),
          services: mapOrDefault(item.services, (s) => s, initialForm.services),
        });
        setErrors({ 
          unit_name: false,
          core: false,
          area_of_duty: false 
        });
        setIsEditModalOpen(true);
      },
    },
    delete: {
      confirmMessage: `Tem certeza que deseja excluir esta Unidade? Esta ação não pode ser desfeita.`,
      onClick: (item) => item.id && handleDelete(item.id),
    },
  };

  const handleSubmit = async (form: any, id?: number) => {
    const newErrors = {
      unit_name: !form.unit_name?.trim(),
      core: !form.core,                            
      area_of_duty: !form.area_of_duty?.length,
    };

    setErrors(newErrors);
    
    if (Object.values(newErrors).some((e) => e)) {
      let errorMessage = "Preencha os campos obrigatórios: ";
      const errorFields = [];
      
      if (newErrors.unit_name) errorFields.push("Nome da Unidade");
      if (newErrors.core) errorFields.push("Núcleo");
      if (newErrors.area_of_duty) errorFields.push("Áreas de Atribuição");
      
      errorMessage += errorFields.join(", ");
      
      setSnackbarType("validationError");
      setSnackbarMessage(errorMessage);
      return; 
    }

    try {
      if (id) {
        await dispatch<any>(patchUnit(form, id));
        setSnackbarType("patchSuccess");
        setSnackbarMessage("Unidade atualizada com sucesso");
        setIsEditModalOpen(false);
      } else {
        await dispatch<any>(postUnit(form));
        setSnackbarType("postSuccess");
        setSnackbarMessage("Unidade criada com sucesso");
        handleClose();
      }
    } catch (err: any) {
      console.error("Erro ao salvar unidade:", err);
      
      const errorMessage = err?.message || err?.response?.data?.message || "Erro ao salvar unidade";
      
      setSnackbarType(id ? "patchError" : "postError");
      setSnackbarMessage(errorMessage);
      
      if (id) {
        setIsEditModalOpen(true);
      } else {
        setIsCreateModalOpen(true);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta unidade? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      await dispatch<any>(removeUnit(id));
      setSnackbarType("deleteSuccess");
      setSnackbarMessage("Unidade excluída com sucesso");
      
      await dispatch<any>(fetchUnit());
    } catch (err: any) {
      console.error("Erro ao deletar unidade:", err);
      
      const errorMessage = err?.message || err?.response?.data?.message || "Erro ao excluir unidade";
      
      setSnackbarType("deleteError");
      setSnackbarMessage(errorMessage);
    }
  };

  const handleClose = () => {
    resetForm({ state: "santa_catarina" });
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <>
      {snackbarType === "noneChange" && (
        <Snackbar type="noneChange" setSnackbarType={setSnackbarType} />
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
      {snackbarType === "validationError" && (
        <Snackbar 
          type="error" 
          setSnackbarType={setSnackbarType}
          customMessage={snackbarMessage}
        />
      )}
       {isVisualizeModalOpen && (
        <Modal
          isOpen={isVisualizeModalOpen}
          onClose={() => setIsVisualizeModalOpen(false)}
          withBackground
          customStyles={style}
          title={"Visualizar unidade"}
        >
          <div className={style.modalContainer}>
            <div className={style.modalContentContainer}>
              <div className={style.modalBodyContainer}>
                <fieldset>
                  <legend className={style.legendMain}>
                    Informações de Cadastro
                  </legend>
                  <div className={style.fieldsetContent}>
                    <div className={style.displayer}>
                      <label>Unidade:</label>
                      <div className={style.information}>
                        {selectedItem?.unit_name}
                      </div>
                    </div>
                    <div className={style.displayer}>
                      <label>Núcleo:</label>
                      <div className={style.information}>
                        {
                          cores.find(
                            (item: any) => item.id === selectedItem?.core
                          )?.core_name
                        }
                      </div>
                    </div>
                    <div className={style.displayer}>
                      <label>Descrição:</label>
                      <div className={style.information}>
                        <p className={style.text}>
                          {selectedItem?.description}
                        </p>
                      </div>
                    </div>
                    <div className={style.displayer}>
                      <label>Observação:</label>
                      <div className={style.information}>
                        <p className={style.text}>
                          {selectedItem?.observation}
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={style.legendMain}>Localidade</legend>
                  <div className={style.displayer}>
                    <label>Endereço:</label>
                    <div className={style.information}>
                      <p className={style.text}>
                        {selectedItem?.street}, {selectedItem?.district},{" "}
                        {selectedItem?.city}/
                        {
                          stateItens.find(
                            (item) => item.key === selectedItem?.state
                          )?.UF
                        }
                        , {selectedItem?.cep}
                      </p>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={style.legendMain}>
                    Defensor Público Titular
                  </legend>
                  <div className={style.fieldsetContent}>
                    <div className={style.displayer}>
                      <label>Nome:</label>
                      <div className={style.information}>
                        <p className={style.text}>{selectedItem?.name_dp}</p>
                      </div>
                    </div>
                    <div className={style.displayer}>
                      <label>Email:</label>
                      <div className={style.information}>
                        <p className={style.text}>{selectedItem?.email_dp}</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={style.legendMain}>Contatos</legend>
                  <div className={style.fieldsetContent}>
                    {selectedItem?.contacts.map((item: any, index: number) => (
                      <div key={index} className={style.displayer}>
                        <label>Telefone {index + 1}:</label>
                        <div className={style.information}>
                          <p className={style.text}>{item?.phone}</p>
                        </div>
                      </div>
                    ))}
                    {selectedItem?.emails.map((item: any, index: number) => (
                      <div key={index} className={style.displayer}>
                        <label>Email {index + 1}:</label>
                        <div className={style.information}>
                          <p className={style.text}>{item?.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={style.legendMain}>
                    Tipos de atendimento e horários
                  </legend>
                  {selectedItem?.services?.map((srv: any, index: number) => (
                    <fieldset key={index}>
                      <legend className={style.legendSecundary}>
                        Atendimento {index + 1}
                      </legend>
                      <div className={style.fieldsetContent}>
                        <div className={style.displayer}>
                          <label>Serviço:</label>
                          <div className={style.information}>
                            <p className={style.text}>
                              {service.find(
                                (s: any) => s.id === srv.type_of_service
                              )?.service_name || srv.type_of_service}
                            </p>
                          </div>
                        </div>
                        <div className={style.displayer}>
                          <label>Horários:</label>
                          <div className={style.information}>
                            <p className={style.text}>{srv.schedules}</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  ))}
                </fieldset>
                <fieldset>
                  <legend className={style.legendMain}>
                    Áreas de Atribuições
                  </legend>
                  <div className={style.displayer}>
                    <label>Atribuições:</label>
                    <div className={style.information}>
                      <p className={style.text}>
                        {selectedItem?.area_of_duty?.join(" | ")}
                      </p>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <UnitModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleClose}
        title={isCreateModalOpen ? "Criar Unidade" : "Editar Unidade"}
        form={form}
        setForm={setForm}
        onSubmit={() =>
          handleSubmit(form, isEditModalOpen ? selectedItem?.id : undefined)
        }
        mode={isCreateModalOpen ? "create" : "edit"}
        handleChange={handleChange}
        handleSelect={handleSelect}
        addField={addField}
        removeField={removeField}
        cores={cores}
        service={service}
        areas={areas}
        stateItens={stateItens}
        customStyles={style}
        errors={errors}
        setErrors={setErrors}
      />
        <Table
        data={data}
        columns={columns}
        booleanColumns={booleanConfig}
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

export default Unidades;