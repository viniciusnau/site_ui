import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { postersForm } from "../../Services/interfaces";
import { ImagesPATH } from "../../PATH";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import ImageEditor from "../ImageEditor/ImageEditor";

type NewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: postersForm;
  editedHTML: string;
  errors: any;
  setErrors: any;
  setForm: React.Dispatch<React.SetStateAction<postersForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (type: string, value: any) => void;
  handleCancel?: () => void;
};

const PostersModal = ({
                        isOpen,
                        onClose,
                        title,
                        form,
                        editedHTML,
                        errors,
                        setErrors,
                        setForm,
                        onSubmit,
                        mode,
                        customStyles = {},
                        handleChange,
                        handleCancel,
                      }: NewsModalProps) => {
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
      const cleanPath = item.image.startsWith("/") ? item.image.substring(1) : item.image;
      return `${getApiBaseUrl()}/${cleanPath}`;
    }
    return "";
  };

  const fileNameFormat = (file: any) => {
    if (file instanceof File) return file.name;
    if (typeof file === "string") {
      const parts = file.split("media/posters/attachments/");
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

  const editorOptions = {
    height: "600",
    buttonList: [
      ["undo", "redo"],
      ["removeFormat"],
      ["bold", "underline", "italic", "fontSize"],
      ["fontColor", "hiliteColor"],
      ["align", "horizontalRule", "list"],
      ["table", "link"],
      ["showBlocks", "codeView"],
      ["math"],
    ],
    katex: katex,
    imageRotation: false,
    inlineStyle: true,
    strictMode: false,
    fontSize: [12, 14, 16, 18, 20],
    imageWidth: "100%",
    imageMaxWidth: "100%",
    colorList: [
      "#828282",
      "#FF5400",
      "#676464",
      "#F1F2F4",
      "#FF9B00",
      "#F00",
      "#fa6e30",
      "#000",
      "rgba(255, 153, 0, 0.1)",
      "#FF6600",
      "#0099FF",
      "#74CC6D",
      "#FF9900",
      "#CCCCCC",
    ],
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
                        <div className={getClass("checkboxBackground")} key={value}>
                          <label className={getClass("checkboxLabel")}>
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
                              {value === "published" ? "Publicar" : "Não publicar"}
                            </p>
                          </label>
                        </div>
                    ))}
                  </div>
                </div>

                <div className={getClass("field")}>
                  <label className={getClass("label")}>Título:</label>
                  <input
                      className={`${getClass("input")} ${errors.title ? getClass("inputError") : ""}`}
                      value={form.title}
                      placeholder="Digite o nome do Título"
                      maxLength={255}
                      onChange={(e) => {
                        handleChange(e.target.value, "title");
                        if (errors.title)
                          setErrors((prev: any) => ({ ...prev, title: false }));
                      }}
                  />
                  {errors.title && <p className={getClass("errorText")}>Título obrigatório</p>}
                </div>

                <div className={getClass("field")}>
                  <label className={getClass("label")}>Descrição:</label>
                  <SunEditor
                      setOptions={editorOptions}
                      lang="pt_br"
                      setContents={editedHTML}
                      onChange={(content) => handleChange(content, "description")}
                  />
                </div>
              </fieldset>

              {showImageEditor && form.image && (
                  <ImageEditor
                      file={form.image}
                      onSave={(editedFile: any) => {
                        setForm((prev) => ({ ...prev, image: editedFile }));
                        setShowImageEditor(false);
                      }}
                      onClose={() => setShowImageEditor(false)}
                  />
              )}

              <fieldset className={getClass("category")}>
                <legend>Anexos</legend>

                <div className={getClass("field")}>
                  <label className={getClass("label")}>Imagem de capa:</label>
                  <label
                      htmlFor="image-upload"
                      className={`${getClass("selectInput")} ${errors.image ? getClass("inputError") : ""}`}
                  >
                    Selecionar Imagem
                  </label>
                  <input
                      type="file"
                      id="image-upload"
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
                  {errors.image && <p className={getClass("errorText")}>Imagem obrigatória</p>}
                  {form.image && (
                      <div className={getClass("previewContainer")}>
                        <div className={getClass("imgContainer")}>
                          <img
                              src={renderImagePreview(form.image)}
                              alt="Imagem de capa"
                              className={getClass("img")}
                              onClick={() => setForm((prev) => ({ ...prev, image: null }))}
                          />
                        </div>
                      </div>
                  )}
                </div>

                <div className={getClass("field")}>
                  <label className={getClass("label")}>Arquivo da cartilha:</label>
                  <label
                      htmlFor="attachment-upload"
                      className={`${getClass("selectInput")} ${errors.attachment ? getClass("inputError") : ""}`}
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
                        setForm((prev) => ({ ...prev, attachment: e.target.files![0] }));
                        if (errors.attachment)
                          setErrors((prev: any) => ({ ...prev, attachment: false }));
                      }}
                  />
                  {errors.attachment && <p className={getClass("errorText")}>Arquivo obrigatório</p>}
                  {form.attachment && (
                      <div className={getClass("previewContainer")}>
                        <div className={getClass("fileContainer")}>
                          <p>{fileNameFormat(form.attachment)}</p>
                          <button
                              type="button"
                              onClick={removeAttachment}
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

export default PostersModal;
