import React, {useState} from "react";
import Modal from "../Modal/Modal";
import { NewsForm } from "../../Services/interfaces";
import { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import { ImagesPATH } from "../../PATH";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ImageEditor from "../ImageEditor/ImageEditor";

type NewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: NewsForm;
  errors: any;
  setErrors: any;
  editedHTML: string;
  setForm: React.Dispatch<React.SetStateAction<NewsForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (type: string, value: any) => void;
  handleCancel?: () => void;
  tags: any[];
  imagesId: number[];
  setImagesId: React.Dispatch<React.SetStateAction<number[]>>;
  attachmentsId: number[];
  setAttachmentsId: React.Dispatch<React.SetStateAction<number[]>>;
};

const NewsModal = ({
  isOpen,
  onClose,
  title,
  editedHTML,
  form,
  errors,
  setErrors,
  setForm,
  onSubmit,
  mode,
  customStyles = {},
  handleChange,
  handleCancel,
  tags,
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

    if (item instanceof File) {
      return URL.createObjectURL(item);
    }

    if (typeof item === "string") {
      if (item.startsWith("http")) {
        return item;
      }
      const cleanPath = item.startsWith("/") ? item.substring(1) : item;
      return `${getApiBaseUrl()}/${cleanPath}`;
    }

    if (item?.image) {
      if (item.image.startsWith("http")) {
        return item.image;
      }
      const cleanPath = item.image.startsWith("/")
        ? item.image.substring(1)
        : item.image;
      return `${getApiBaseUrl()}/${cleanPath}`;
    }

    return "";
  };

  const removeFromGallery = (index: number) => {
    setForm((prev) => {
      const item = prev.gallery[index];
      const removedId =
        typeof item === "object" && "id" in item
          ? (item.id as number)
          : undefined;

      return {
        ...prev,
        gallery: prev.gallery.filter((_, i) => i !== index),
        removed_gallery: removedId
          ? [...prev.removed_gallery, removedId]
          : [...prev.removed_gallery],
      };
    });
  };

  const removeAttachment = (index: number) => {
    setForm((prev) => {
      const item = prev.attachments[index];
      const removedId =
        typeof item === "object" && "id" in item
          ? (item.id as number)
          : undefined;

      return {
        ...prev,
        attachments: prev.attachments.filter((_, i) => i !== index),
        removed_attachments: removedId
          ? [...prev.removed_attachments, removedId]
          : [...prev.removed_attachments],
      };
    });
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

  const fileNameFormat = (file: any, index: number) => {
    let fileName =
      file instanceof File
        ? file.name
        : file.name || file.file || `Anexo ${index + 1}`;
    const parts = fileName.split("media/news/attachments/");
    return parts.length > 1 ? parts[1] : fileName;
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
          {showImageEditor && form.thumbnail && (
            <ImageEditor
              file={form.thumbnail}
              onSave={(editedFile: any) => {
                setForm((prev) => ({
                  ...prev,
                  thumbnail: editedFile,
                }));
                setShowImageEditor(false);
              }}
              onClose={() => setShowImageEditor(false)}
            />
          )}

          <fieldset className={getClass("category")}>
            <legend>Dados do Cadastro</legend>
            <div className={getClass("field")}>
              <label className={getClass("label")}>Publicar:</label>
              <div className={getClass("checkboxContainer")}>
                {["published", "not_published", "scheduled"].map((value) => (
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
                          : value === "scheduled"
                          ? "Agendar"
                          : "-"}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {form.status === "scheduled" && (
              <div className={getClass("field")}>
                <label className={getClass("label")}>Agendar publicação:</label>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{
                      cancelButtonLabel: "Cancelar",
                      okButtonLabel: "OK",
                    }}
                  >
                    <DatePicker
                      label="Data da publicação"
                      value={form.scheduled_date}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          scheduled_date: value as Dayjs | null,
                        }))
                      }
                      format="DD/MM/YYYY"
                    />
                    <TimePicker
                      label="Horário"
                      value={form.scheduled_time}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          scheduled_time: value as Dayjs | null,
                        }))
                      }
                      ampm={false}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            )}

            <div className={getClass("field")}>
              <label className={getClass("label")}>Destaque:</label>
              <div className={getClass("checkboxContainer")}>
                {["main", "secondary", "normal"].map((value) => (
                  <div className={getClass("checkboxBackground")}>
                    <label key={value} className={getClass("checkboxLabel")}>
                      <input
                        className={getClass("inputCheckbox")}
                        type="radio"
                        name="highlight"
                        value={value}
                        checked={form.highlight === value}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            highlight: e.target.value,
                          }))
                        }
                      />
                      <p className={getClass("checkboxText")}>
                        {value === "main"
                          ? "Destaque"
                          : value === "secondary"
                          ? "Sub-destaque"
                          : "Sem destaque"}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            </div>

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

            <div className={getClass("field")}>
              <label className={getClass("label")}>Subtítulo:</label>
              <input
                className={getClass("input")}
                value={form.subtitle}
                placeholder="Digite aqui o subtítulo"
                maxLength={500}
                onChange={(e) => handleChange(e.target.value, "subtitle")}
              />
            </div>

            <div className={getClass("field")}>
              <label className={getClass("label")}>Imagem da capa:</label>
              <label
                htmlFor="thumbnail-upload"
                className={`${getClass("selectInput")} ${
                  errors.thumbnail ? getClass("inputError") : ""
                }`}
              >
                Selecionar Imagem
              </label>
              <input
                required
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setForm((prev) => ({
                      ...prev,
                      thumbnail: e.target.files![0],
                    }));
                    setShowImageEditor(true);
                    if (errors.thumbnail)
                      setErrors((prev: any) => ({
                        ...prev,
                        thumbnail: false,
                      }));
                  }
                }}
              />
              {errors.thumbnail && (
                <p className={getClass("errorText")}>Imagem obrigatória</p>
              )}

              {form.thumbnail && (
                <div className={getClass("imgContainer")}>
                  <img
                    src={renderImagePreview(form.thumbnail)}
                    alt="Thumbnail"
                    className={getClass("img")}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, thumbnail: "" }))
                    }
                  />
                </div>
              )}
            </div>
          </fieldset>

          <fieldset className={getClass("category")}>
            <legend>Conteúdo</legend>
            <div
              className={`${getClass("textField")} ${
                errors.text ? getClass("inputError") : ""
              }`}
            >
              <SunEditor
                setOptions={editorOptions}
                lang="pt_br"
                setContents={editedHTML}
                onChange={(content) => {
                  handleChange(content, "text");
                  if (errors.text)
                    setErrors((prev: any) => ({ ...prev, text: false }));
                }}
              />
              {errors.text && (
                <p className={getClass("errorText")}>Conteúdo obrigatório</p>
              )}
            </div>

            <div className={getClass("Field")}>
              <label className={getClass("label")}>Tags:</label>
              <div className={getClass("tagsContainer")}>
                {tags.map((item: any) => (
                  <div
                    key={item.id}
                    className={getClass("modalCheckboxContainer")}
                  >
                    <input
                      type="checkbox"
                      checked={form.tags.includes(item.id)}
                      className={`${getClass("inputCheckbox")} ${getClass(
                        "squareCheckbox"
                      )}`}
                      onChange={(e) => {
                        if (e.target.checked)
                          setForm((prev) => ({
                            ...prev,
                            tags: [...prev.tags, item.id],
                          }));
                        else
                          setForm((prev) => ({
                            ...prev,
                            tags: prev.tags.filter((id) => id !== item.id),
                          }));
                      }}
                    />
                    <span>{item.name_tag}</span>
                  </div>
                ))}
              </div>
              <div className={getClass("tagsContainer")}>
                <p>Tags selecionadas:</p>
                {tags.filter((t: any) => form.tags.includes(t.id)).length > 0 ? (
                  tags
                    .filter((t: any) => form.tags.includes(t.id))
                    .map((tag: any) => (
                      <div
                        key={tag.id}
                        className={getClass("selectedTag")}
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            tags: prev.tags.filter((id) => id !== tag.id),
                          }))
                        }
                      >
                        <p>{tag.name_tag}</p>
                      </div>
                    ))
                ) : (
                  <div className={getClass("msgTag")}>
                    Nenhuma tag selecionada
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className={getClass("category")}>
            <legend>Anexos</legend>
            <div className={getClass("field")}>
              <label className={getClass("label")}>Galeria de imagens:</label>
              <label
                htmlFor="gallery-upload"
                className={getClass("selectInput")}
              >
                Selecionar Imagem
              </label>
              <input
                type="file"
                id="gallery-upload"
                accept="image/*"
                style={{ display: "none" }}
                multiple
                onChange={(e) => {
                  if (!e.target.files) return;
                  setForm((prev) => ({
                    ...prev,
                    gallery: [
                      ...(prev.gallery || []),
                      ...Array.from(e.target.files ?? []),
                    ],
                  }));
                }}
              />
              <div className={getClass("previewContainer")}>
                {form.gallery.map((item, index) => (
                  <div
                    key={index}
                    className={getClass("imgContainer")}
                    onClick={() => removeFromGallery(index)}
                  >
                    <img
                      src={renderImagePreview(item)}
                      alt={`Imagem ${index + 1}`}
                      className={getClass("img")}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={getClass("field")}>
              <label className={getClass("label")}>Anexos:</label>
              <label
                htmlFor="attachment-upload"
                className={getClass("selectInput")}
              >
                Selecionar arquivo
              </label>
              <input
                type="file"
                id="attachment-upload"
                style={{ display: "none" }}
                multiple
                onChange={(e) => {
                  if (!e.target.files) return;
                  setForm((prev) => ({
                    ...prev,
                    attachments: [
                      ...(prev.attachments || []),
                      ...Array.from(e.target.files ?? []),
                    ],
                  }));
                }}
              />
              <div className={getClass("previewAttachment")}>
                {form.attachments.map((file: any, index: number) => (
                  <div key={index} className={getClass("fileContainer")}>
                    <p>{fileNameFormat(file, index)}</p>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className={getClass("removeButtonAttachment")}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
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

export default NewsModal;
