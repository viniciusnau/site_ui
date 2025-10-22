import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { serviceButtonsForm } from "../../Services/interfaces";
import { ImagesPATH } from "../../PATH";
import ImageEditor from "../ImageEditor/ImageEditor";
import ColorPicker from "../ColorPicker/ColorPicker";

type ServiceButtonsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: serviceButtonsForm;
  errors: any;
  setErrors: any;
  setForm: React.Dispatch<React.SetStateAction<serviceButtonsForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (value: any, type: string) => void;
  handleCancel?: () => void;
};

const ServiceButtonsModal = ({
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
  handleCancel,
}: ServiceButtonsModalProps) => {
  const [showImageEditor, setShowImageEditor] = useState(false);

  const getClass = (base: string) => {
    return (customStyles[base] || "").trim();
  };

  const getApiBaseUrl = () => {
    return ImagesPATH;
  };

  const renderImagePreview = (item: any) => {
    if (!item) return "";
    if (item instanceof File) return URL.createObjectURL(item);
    if (typeof item === "string") {
      if (item.startsWith("http")) return item;
      const cleanPath = item.startsWith("/") ? item.substring(1) : item;
      return `${getApiBaseUrl()}/${cleanPath}`;
    }
    if (item?.image) {
      if (item.image.startsWith("http")) return item.image;
      const cleanPath = item.image.startsWith("/")
        ? item.image.substring(1)
        : item.image;
      return `${getApiBaseUrl()}/${cleanPath}`;
    }
    return "";
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
                <label className={getClass("label")}>Título:</label>
                <input
                  className={`${getClass("input")} ${
                    errors.title ? getClass("inputError") : ""
                  }`}
                  value={form.title}
                  placeholder="Digite o Título"
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
              <div className={getClass("field")}>
                <label className={getClass("label")}>Cor do Título:</label>
                <ColorPicker
                  value={form.title_color}
                  onChange={(color: string) =>
                    handleChange(color, "title_color")
                  }
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Posição:</label>
                <select
                  className={`${getClass("input")} ${
                    errors.position ? getClass("inputError") : ""
                  }`}
                  value={form.position ?? ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    handleChange(value, "position");
                    if (errors.position)
                      setErrors((prev: any) => ({ ...prev, position: false }));
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>

                {errors.position && (
                  <p className={getClass("errorText")}>Posição obrigatória</p>
                )}
              </div>

              <div className={getClass("field")}>
                <label className={getClass("label")}>Link:</label>
                <input
                  className={`${getClass("input")}`}
                  value={form.link}
                  placeholder="Digite o link de redirecionamento"
                  maxLength={255}
                  onChange={(e) => handleChange(e.target.value, "link")}
                />
              </div>
            </fieldset>

            <fieldset className={getClass("category")}>
              <legend>Anexos</legend>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Imagem:</label>
                <label
                  htmlFor="image-upload-desktop"
                  className={`${getClass("selectInput")} ${
                    errors.image ? getClass("inputError") : ""
                  }`}
                >
                  Selecionar Imagem
                </label>
                <input
                  type="file"
                  id="image-upload-desktop"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    setForm((prev) => ({ ...prev, image: file }));
                    setShowImageEditor(true);
                    if (errors.image)
                      setErrors((prev: any) => ({ ...prev, image: false }));
                  }}
                />
                {errors.image && (
                  <p className={getClass("errorText")}>Imagem obrigatória</p>
                )}
                {form.image && (
                  <div className={getClass("previewContainer")}>
                    <div className={getClass("imgContainer")}>
                      <img
                        src={renderImagePreview(form.image)}
                        alt="Imagem do banner desktop"
                        className={getClass("img")}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, image: null }))
                        }
                      />
                    </div>
                  </div>
                )}
                {showImageEditor && form.image && (
                  <ImageEditor
                    aspectRatio={9 / 6}
                    minWidth={360}
                    minHeight={240}
                    file={form.image}
                    onSave={(editedFile: any) => {
                      setForm((prev) => ({ ...prev, image: editedFile }));
                      setShowImageEditor(false);
                    }}
                    onClose={() => setShowImageEditor(false)}
                  />
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

export default ServiceButtonsModal;
