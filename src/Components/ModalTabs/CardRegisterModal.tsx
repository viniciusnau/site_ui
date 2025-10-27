import React, { useEffect } from "react";
import Modal from "../Modal/Modal";
import { CardRegisterForm } from "../../Services/interfaces";
import "dayjs/locale/pt-br";
import { ImagesPATH } from "../../PATH";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import { fetchCards } from "../../Services/Slices/CardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type CardRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: CardRegisterForm;
  errors: any;
  setErrors: any;
  editedHTML: string;
  setForm: React.Dispatch<React.SetStateAction<CardRegisterForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (value: string | number, type: string) => void;
  handleCancel?: () => void;
};

const CardRegisterModal = ({
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
                           }: CardRegisterModalProps) => {
  const dispatch = useDispatch();
  const cards = useSelector((state: any) => state.cardsSlice?.data || []);

  useEffect(() => {
    dispatch<any>(fetchCards());
  }, [dispatch]);

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
                  <label className={getClass("label")}>Título do Registro:</label>
                  <input
                      className={`${getClass("input")} ${
                          errors.title ? getClass("inputError") : ""
                      }`}
                      value={form.title}
                      placeholder="Digite o título do Registro"
                      maxLength={150}
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
                  <label className={getClass("label")}>Imagem:</label>
                  <label
                      htmlFor="image-upload"
                      className={`${getClass("selectInput")} ${
                          errors.image ? getClass("inputError") : ""
                      }`}
                  >
                    Selecionar Imagem
                  </label>
                  <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setForm((prev) => ({
                            ...prev,
                            image: e.target.files![0],
                          }));
                          if (errors.image)
                            setErrors((prev: any) => ({ ...prev, image: false }));
                        }
                      }}
                  />
                  {errors.image && (
                      <p className={getClass("errorText")}>Imagem obrigatória</p>
                  )}
                  {form.image && (
                      <div className={getClass("imgContainer")}>
                        <img
                            src={renderImagePreview(form.image)}
                            alt="Image"
                            className={getClass("img")}
                            onError={(e) =>
                                ((e.target as HTMLImageElement).style.display = "none")
                            }
                            onClick={() =>
                                setForm((prev) => ({ ...prev, image: "" }))
                            }
                        />
                      </div>
                  )}
                </div>
              </fieldset>

              <fieldset className={getClass("category")}>
                <legend>Selecionar Coleção</legend>
                <div className={getClass("field")}>
                  <label className={getClass("label")}>Escolha uma coleção:</label>
                  <FormControl fullWidth className={getClass("mui")}>
                    <InputLabel id="card-select-label">Coleção</InputLabel>
                    <Select
                        labelId="card-select-label"
                        value={form.card || ""}
                        label="Coleção"
                        onChange={(e: SelectChangeEvent<string | number>) =>
                            handleChange(e.target.value, "card")
                        }
                    >
                      <MenuItem value="" disabled>
                        Selecione uma coleção
                      </MenuItem>
                      {cards
                          .filter((item: any) => item.status === "published")
                          .map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.title}
                              </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
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

export default CardRegisterModal;