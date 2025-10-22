import React from "react";
import { unit } from "../../Components/TableInterfaces";
import Modal from "../Modal/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { InputType } from "../../Pages/Admin/Cores/Tabs/unidades/Unidades";

type UnitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: unit;
  setForm: React.Dispatch<React.SetStateAction<unit>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (path: any, value: any, inputType?: InputType) => void;
  handleSelect: (event: any) => void;
  addField: <K extends keyof unit>(field: K, value: any) => void;
  removeField: <K extends keyof unit>(field: K, index: number) => void;
  handleCancel?: () => void;
  cores: any[];
  service: any[];
  areas: any[];
  stateItens: { key: string; label: string }[];
  errors: any;
  setErrors: any;
};

const UnitModal = ({
  isOpen,
  onClose,
  title,
  form,
  setForm,
  onSubmit,
  mode,
  customStyles = {},
  handleChange,
  handleSelect,
  addField,
  removeField,
  handleCancel,
  cores,
  service,
  areas,
  stateItens,
  errors, 
  setErrors, 
  ...props
}: UnitModalProps) => {
  const getClass = (base: string) => {
    const customClass = customStyles[base] || "";
    return `${customClass}`.trim();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      withBackground
      customStyles={customStyles}
      title={title}
    >
      <div className={getClass("modalContainer")}>
        <div className={getClass("modalContentContainer")}>
          <div className={getClass("modalBodyContainer")}>
            <fieldset className={getClass("category")}>
              <legend>Dados do Cadastro</legend>

              <div className={getClass("field")}>
                <label className={getClass("label")}>Publicar:</label>
                <div className={getClass("checkboxContainer")}>
                  {["published", "not_published"].map((value) => (
                  <div key={value} className={getClass("checkboxBackground")}>
                    <label className={getClass("checkboxLabel")}>
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
                          className={getClass("inputCheckbox")}
                        />
                          <p className={getClass("checkboxText")}>
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
              <div className={getClass("field")}>
                <label className={getClass("label")}>É principal:</label>
                <div className={getClass("checkboxContainer")}>
                  {[
                    { label: "Sim", value: "true" },
                    { label: "Não", value: "false" }
                  ].map(({ label, value }) => (
                    <div key={value} className={getClass("checkboxBackground")}>
                      <label className={getClass("checkboxLabel")}>
                        <input
                          type="radio"
                          name="is_principal"
                          value={value}
                          checked={String(form.is_principal) === value}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              is_principal: e.target.value === "true"
                            }))
                          }
                          className={getClass("inputCheckbox")}
                        />
                        <p className={getClass("checkboxText")}>{label}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Unidade:</label>
                <div>
                <input
                  className={`${getClass("input")} ${errors?.unit_name ? getClass("inputError") || "error" : ""}`}
                  value={form.unit_name}
                  placeholder="Digite o nome da unidade"
                  onChange={(e) => {
                    handleChange("unit_name", e.target.value);
                    if (errors?.unit_name && setErrors) {
                      setErrors((prev: any) => ({ ...prev, unit_name: false }));
                    }
                  }}
                />
                  {errors?.unit_name && (
                    <p className={getClass("errorText")}>Nome da unidade é obrigatório</p>
                  )}
              </div>
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Núcleo:</label>
                <FormControl 
                  fullWidth 
                  className={`${getClass("mui")} ${errors?.core ? "error" : ""}`}
                  error={errors?.core}
                >
                  <InputLabel id="core">Núcleo</InputLabel>
                  <Select
                    labelId="core"
                    name="core"
                    value={form.core?.toString() || ""}
                    label="Núcleo"
                    onChange={(e) => {
                      handleSelect(e);
                      if (errors?.core && setErrors) {
                        setErrors((prev: any) => ({ ...prev, core: false }));
                      }
                    }}
                  >
                    {cores.map((item: any) => (
                      <MenuItem key={item.id} value={item.id.toString()}>
                        {item.core_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors?.core && (
                    <p className={getClass("errorText")}>
                      Selecione um núcleo
                    </p>
                  )}
                </FormControl>
              </div>

              <div className={getClass("field")}>
                <label className={getClass("label")}>URL:</label>
                <input
                  className={getClass("input")}
                  value={form.url}
                  placeholder="https://defensoria.sc.def.br/unidades/"
                  onChange={(e) => handleChange("url", e.target.value, "url")}
                />
              </div>

              <div className={getClass("field")}>
                <label className={getClass("label")}>Descrição:</label>
                <textarea
                  className={getClass("textarea")}
                  value={form.description}
                  placeholder="Digite a descrição"
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className={getClass("field")}>
                <label className={getClass("label")}>Observação:</label>
                <textarea
                  className={getClass("textarea")}
                  value={form.observation}
                  placeholder="Digite a observação"
                  onChange={(e) => handleChange("observation", e.target.value)}
                />
              </div>
            </fieldset>

            <fieldset className={getClass("category")}>
              <legend>Defensor Público Titular</legend>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Nome:</label>
                <input
                  className={getClass("input")}
                  value={form.name_dp}
                  placeholder="Digite o nome do Defensor"
                  onChange={(e) => handleChange("name_dp", e.target.value)}
                />
              </div>

              <div className={getClass("field")}>
                <label className={getClass("label")}>Email:</label>
                <input
                  className={getClass("input")}
                  value={form.email_dp}
                  placeholder="Digite o email do Defensor"
                  onChange={(e) =>
                    handleChange("email_dp", e.target.value.trim(), "email")
                  }
                />
              </div>
            </fieldset>

            <fieldset className={getClass("category")}>
              <legend>Endereço</legend>
              <div className={getClass("field")}>
                <label className={getClass("label")}>CEP:</label>
                <input
                  className={getClass("input")}
                  value={form.cep}
                  placeholder="Digite o CEP da unidade"
                  onChange={(e) => handleChange("cep", e.target.value.trim(), "cep")}
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Logradouro:</label>
                <input
                  className={getClass("input")}
                  value={form.street}
                  placeholder="Digite o logradouro"
                  onChange={(e) => handleChange("street", e.target.value)}
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Bairro:</label>
                <input
                  className={getClass("input")}
                  value={form.district}
                  placeholder="Digite o bairro"
                  onChange={(e) => handleChange("district", e.target.value)}
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Cidade:</label>
                <input
                  className={getClass("input")}
                  value={form.city}
                  placeholder="Digite a cidade da unidade"
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Estado:</label>
                <FormControl fullWidth className={getClass("mui")}>
                  <InputLabel id="state">Estado</InputLabel>
                  <Select
                    labelId="state"
                    name="state"
                    label="Estado"
                    value={form.state || ""}
                    onChange={handleSelect}
                  >
                    {stateItens.map((item) => (
                      <MenuItem key={item.key} value={item.key}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </fieldset>

            <fieldset className={getClass("category")}>
              <legend>Contato</legend>
              {(form.contacts || []).map((contactItem, index) => (
                <fieldset key={index} className={getClass("category")}>
                  <legend>Telefone {index + 1}°</legend>
                  <div className={getClass("field")}>
                    <label className={getClass("label")}>Número:</label>
                    <input
                      className={getClass("input")}
                      value={contactItem.phone}
                      placeholder="Digite número de telefone da unidade"
                      onChange={(e) =>
                        handleChange(
                          ["contacts", index, "phone"],
                          e.target.value, "phone"
                        )
                      }
                    />
                  </div>
                  <div className={getClass("field")}>
                    <label className={getClass("label")}>É Whatsapp?</label>
                    <div className={getClass("checkboxContainer")}>
                      {[
                        { label: "Sim", value: "true" },
                        { label: "Não", value: "false" }
                      ].map(({ label, value }) => (
                        <div key={value} className={getClass("checkboxBackground")}>
                          <label className={getClass("checkboxLabel")}>
                            <input
                              type="radio"
                              name={`is_whatsapp-${index}`}
                              value={value}
                              checked={String(contactItem.is_whatsapp) === value}
                              onChange={(e) =>
                                handleChange(
                                  ["contacts", index, "is_whatsapp"],
                                  e.target.value === "true"
                                )
                              }
                              className={getClass("inputCheckbox")}
                            />
                            <p className={getClass("checkboxText")}>{label}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={getClass("field")}>
                    <label className={getClass("label")}>Departamento:</label>
                    <input
                      className={getClass("input")}
                      value={contactItem.department}
                      placeholder="Digite o departamento"
                      onChange={(e) =>
                        handleChange(
                          ["contacts", index, "department"],
                          e.target.value
                        )
                      }
                    />
                  </div>
                  {index > 0 && (
                    <button
                      className={`${getClass("button")} ${getClass("cancel")}`}
                      type="button"
                      onClick={() => removeField("contacts", index)}
                    >
                      Remover
                    </button>
                  )}
                </fieldset>
              ))}
              <button
                className={getClass("button")}
                type="button"
                onClick={() =>
                  addField("contacts", {
                    phone: "",
                    is_whatsapp: false,
                    department: "",
                  })
                }
              >
                Adicionar Telefone
              </button>
              {(form.emails || []).map((emailItem, index) => (
                <fieldset key={index} className={getClass("category")}>
                  <legend>E-mail {index + 1}°</legend>
                  <div className={getClass("field")}>
                    <label className={getClass("label")}>E-mail:</label>
                    <input
                      className={getClass("input")}
                      value={emailItem.email}
                      placeholder="Digite o email da unidade"
                      onChange={(e) =>
                        handleChange(["emails", index, "email"], e.target.value, "email")
                      }
                    />
                  </div>
                  {index > 0 && (
                    <button
                      className={`${getClass("button")} ${getClass("cancel")}`}
                      type="button"
                      onClick={() => removeField("emails", index)}
                    >
                      Remover
                    </button>
                  )}
                </fieldset>
              ))}
              <button
                className={getClass("button")}
                type="button"
                onClick={() => addField("emails", { email: "" })}
              >
                Adicionar Email
              </button>
            </fieldset>

            {(form.services || []).map((serviceItem, index) => (
              <fieldset key={index} className={getClass("category")}>
                <legend>Tipo de Atendimento e Horários {index + 1}</legend>

                <div className={getClass("field")}>
                  <label className={getClass("label")}>Tipo:</label>
                  <FormControl fullWidth className={getClass("mui")}>
                    <InputLabel id="service">Tipo de serviço</InputLabel>
                    <Select
                      labelId="service"
                      name="service"
                      value={serviceItem.type_of_service || ""}
                      label="Tipo de serviço"
                      onChange={(e) =>
                        handleChange(
                          ["services", index, "type_of_service"],
                          Number(e.target.value)
                        )
                      }
                    >
                      <MenuItem value="" disabled>
                        Selecione um tipo
                      </MenuItem>
                      {service
                        .filter((item: any) => item.status === "published")
                        .map((item: any) => (
                          <MenuItem  key={item.id} value={item.id}>
                            {item.service_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>

                <div className={getClass("field")}>
                  <label className={getClass("label")}>Horários:</label>
                  <textarea
                    className={getClass("textarea")}
                    value={serviceItem.schedules}
                    placeholder="Digite as informações sobre os horários"
                    onChange={(e) =>
                      handleChange(
                        ["services", index, "schedules"],
                        e.target.value
                      )
                    }
                  />
                </div>

                {index > 0 && (
                  <button
                    className={`${getClass("button")} ${getClass("cancel")}`}
                    type="button"
                    onClick={() => removeField("services", index)}
                  >
                    Remover
                  </button>
                )}
              </fieldset>
            ))}

            <button
              className={getClass("button")}
              type="button"
              onClick={() => addField("services", cores)}
            >
              Adicionar Tipo de Atendimento
            </button>
            <fieldset className={getClass("category")}>
              <legend>Áreas de Atribuição</legend>
              
              <div className={`${getClass("checkboxGrid")} ${errors?.area_of_duty ? getClass("checkboxGridError") || "error-border" : ""}`}>
                {areas.map((item: any) => (
                  <div
                    key={item.id}
                    className={getClass("checkboxContainer")}
                  >
                    <input
                      type="checkbox"
                      checked={
                        form.area_of_duty?.includes(item.dutie_name) || false
                      }
                      className={`${getClass("inputCheckbox")} ${getClass(
                        "squareCheckbox"
                      )}`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm((prev) => ({
                            ...prev,
                            area_of_duty: [
                              ...(prev.area_of_duty || []),
                              item.dutie_name,
                            ],
                          }));
                        } else {
                          setForm((prev) => ({
                            ...prev,
                            area_of_duty: (prev.area_of_duty || []).filter(
                              (name) => name !== item.dutie_name
                            ),
                          }));
                        }
                        if (errors?.area_of_duty && setErrors) {
                          setErrors((prev: any) => ({ 
                            ...prev, 
                            area_of_duty: false }));
                        }
                      }}
                    />
                    <span>{item.dutie_name}</span>
                  </div>
                ))}
              </div>
              {errors?.area_of_duty && (
                <p className={getClass("errorText")}>
                  Selecione pelo menos uma área de atribuição
                </p>
              )}
            </fieldset>

            <fieldset className={getClass("category")}>
              <legend>Link para agendar atendimento</legend>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Link:</label>
                <input
                  className={getClass("input")}
                  value={form.link_schedule_service}
                  placeholder="Digite o Link de agendamento"
                  onChange={(e) =>
                    handleChange("link_schedule_service", e.target.value)
                  }
                />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className={getClass("modalButtonContainer")}>
        <button className={getClass("button")} onClick={onSubmit}>
          {mode === "create" ? "Criar" : "Salvar"}
        </button>
        <button
          className={`${getClass("button")} ${getClass("cancel")}`}
          onClick={() => onClose()}
        >
          {mode === "create" ? "Fechar" : "Cancelar"}
        </button>
      </div>
    </Modal>
  );
};

export default UnitModal;