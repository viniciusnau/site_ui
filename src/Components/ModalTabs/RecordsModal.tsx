import React from "react";
import Modal from "../Modal/Modal";
import { recordsForm } from "../../Services/interfaces";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";

type RecordsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: recordsForm;
  errors: any;
  setErrors: any;
  setForm: React.Dispatch<React.SetStateAction<recordsForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (type: string, value: any) => void;
  handleCancel?: () => void;
  category: any;
  sub_category: any;
};

const RecordsModal = ({
  isOpen,
  onClose,
  title,
  form,
  errors,
  setErrors,
  setForm,
  onSubmit,
  mode,
  customStyles = {},
  handleChange,
  category,
  sub_category,
}: RecordsModalProps) => {
  const getClass = (base: string) => {
    return (customStyles[base] || "").trim();
  };

  const fileNameFormat = (file: any) => {
    if (file instanceof File) return file.name;
    if (typeof file === "string") {
      const parts = file.split("media/records/attachments/");
      return parts.length > 1 ? parts[1] : file;
    }
    return "Anexo";
  };

  const removeAttachment = () => {
    setForm((prev) => ({
      ...prev,
      attachment: null,
    }));
  };

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { sub_category: "" } : {}),
    }));
  };

  const filteredSubcategories = sub_category.filter(
    (item: any) => item.category === form.category
  );

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
                    <div className={getClass("checkboxBackground")}>
                      <label key={value} className={getClass("checkboxLabel")}>
                        <input
                          className={getClass("inputCheckbox")}
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
                <label className={getClass("label")}>Categoria:</label>
                <FormControl
                  fullWidth
                  className={`${getClass("mui")} ${
                    errors.category ? getClass("inputError") : ""
                  }`}
                >
                  <InputLabel id="category">Categoria</InputLabel>
                  <Select
                    labelId="category"
                    name="category"
                    label="Categoria"
                    value={form.category || ""}
                    onChange={handleSelect}
                  >
                    {category.map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.category && (
                  <p className={getClass("errorText")}>Categoria obrigatória</p>
                )}
              </div>
              {form.category && filteredSubcategories.length > 0 && (
                <div className={getClass("field")}>
                  <label className={getClass("label")}>Sub categoria:</label>
                  <FormControl fullWidth className={getClass("mui")}>
                    <InputLabel id="subcategory">Sub categoria</InputLabel>
                    <Select
                      labelId="subcategory"
                      name="sub_category"
                      label="Sub categoria"
                      value={form.sub_category || ""}
                      onChange={handleSelect}
                    >
                      {filteredSubcategories.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}

              <div className={getClass("field")}>
                <label className={getClass("label")}>Título:</label>
                <input
                  className={`${getClass("input")} ${
                    errors.title ? getClass("inputError") : ""
                  }`}
                  value={form.title}
                  placeholder="Digite o nome do Título"
                  maxLength={255}
                  onChange={(e) => {
                    handleChange(e.target.value, "title");
                    if (errors.title)
                      setErrors((prev: any) => ({ ...prev, title: false }));
                  }}
                />
                {errors.title && (
                  <p className={getClass("errorText")}>Título obrigatório</p>
                )}
              </div>
            </fieldset>

            <fieldset className={getClass("category")}>
              <legend>Anexos</legend>
              <div className={getClass("field")}>
                <label className={getClass("label")}>
                  Arquivo de Download:
                </label>
                <label
                  htmlFor="attachment-upload"
                  className={`${getClass("selectInput")} ${
                    errors.attachment ? getClass("inputError") : ""
                  }
                  }`}
                >
                  Selecionar arquivo
                </label>
                <input
                  type="file"
                  id="attachment-upload"
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setForm((prev) => ({
                      ...prev,
                      attachment: e.target.files![0],
                    }));
                    if (errors.attachment)
                      setErrors((prev: any) => ({
                        ...prev,
                        attachment: false,
                      }));
                  }}
                />
                {errors.attachment && (
                  <p className={getClass("errorText")}>Arquivo obrigatório</p>
                )}
                {form.attachment && (
                  <div className={getClass("previewContainer")}>
                    <div className={getClass("fileContainer")}>
                      <p>{fileNameFormat(form.attachment)}</p>
                      <button
                        type="button"
                        onClick={() => removeAttachment()}
                        className={getClass("removeButtonAttachment")}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </fieldset>
          </div>
        </div>
        <div className={getClass("modalButtonContainer")}>
          <button className={getClass("button")} onClick={onSubmit}>
            {mode === "create" ? "Criar" : "Salvar"}
          </button>
          <button
            className={`${getClass("button")} ${getClass("cancel")}`}
            onClick={onClose}
          >
            {mode === "create" ? "Fechar" : "Cancelar"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RecordsModal;
