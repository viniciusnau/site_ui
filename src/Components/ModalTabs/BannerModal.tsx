import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { bannerForm } from "../../Services/interfaces";
import { ImagesPATH } from "../../PATH";
import ImageEditor from "../ImageEditor/ImageEditor";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type BannerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: bannerForm;
  errors: any;
  setErrors: any;
  setForm: React.Dispatch<React.SetStateAction<bannerForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (value: any, type: string) => void;
  handleCancel?: () => void;
};

const BannerModal = ({
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
}: BannerModalProps) => {
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [showImageEditorMobile, setShowImageEditorMobile] = useState(false);

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
                <label className={getClass("label")}>Grupo:</label>
                <FormControl fullWidth className={`${getClass("mui")} ${
                    errors.group ? getClass("inputError") : ""
                  }`}>
                  <InputLabel id="group">Grupo</InputLabel>
                  <Select
                    labelId="group"
                    name="group"
                    label="Grupo"
                    value={form.group}
                    onChange={(e) => {
                    handleChange(e.target.value, "group")
                    if (errors.group)
                      setErrors((prev: any) => ({ ...prev, group: false }));
                  }}
                  >
                    {["slides", "footer_banner"].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value === "slides"
                          ? "Slides"
                          : value === "footer_banner"
                          ? "Banner do rodapé"
                          : "-"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.group && (
                  <p className={getClass("errorText")}>Grupo obrigatório</p>
                )}
              </div>
              {form.group === "slides" && (
                <div className={getClass("field")}>
                  <label className={getClass("label")}>Posição:</label>
                  <input
                    type="number"
                    className={getClass("input")}
                    value={form.position ?? ""}
                    onChange={(e) => handleChange(e.target.value, "position")}
                    min={1}
                  />
                </div>
              )}
              <div className={getClass("field")}>
                <label className={getClass("label")}>Texto alternativo:</label>
                <input
                  className={`${getClass("input")}`}
                  value={form.alt}
                  placeholder="Digite o nome do texto alternativo"
                  maxLength={255}
                  onChange={(e) => handleChange(e.target.value, "alt")}
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Link:</label>
                <input
                  className={`${getClass("input")}`}
                  value={form.slug}
                  placeholder="Digite o link de redirecionamento"
                  maxLength={255}
                  onChange={(e) => handleChange(e.target.value, "slug")}
                />
              </div>
            </fieldset>

            <fieldset className={getClass("category")}>
              <legend>Anexos</legend>
              <div className={getClass("field")}>
                <label className={getClass("label")}>
                  Imagem do banner (Desktop):
                </label>
                <label
                  htmlFor="image-upload-desktop"
                  className={`${getClass("selectInput")} ${
                    errors.banner ? getClass("inputError") : ""
                  }`}
                >
                  Selecionar Imagem Desktop
                </label>
                <input
                  type="file"
                  id="image-upload-desktop"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    setForm((prev) => ({ ...prev, banner: file }));
                    setShowImageEditor(true);
                    if (errors.banner)
                      setErrors((prev: any) => ({ ...prev, banner: false }));
                  }}
                />
                {errors.banner && (
                  <p className={getClass("errorText")}>Banner obrigatório</p>
                )}
                {form.banner && (
                  <div className={getClass("previewContainer")}>
                    <div className={getClass("imgContainer")}>
                      <img
                        src={renderImagePreview(form.banner)}
                        alt="Imagem do banner desktop"
                        className={getClass("img")}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, banner: null }))
                        }
                      />
                    </div>
                  </div>
                )}
                {showImageEditor && form.banner && (
                  <ImageEditor
                    aspectRatio={16 / 3}
                    minWidth={1280}
                    minHeight={260}
                    file={form.banner}
                    onSave={(editedFile: any) => {
                      setForm((prev) => ({ ...prev, banner: editedFile }));
                      setShowImageEditor(false);
                    }}
                    onClose={() => setShowImageEditor(false)}
                  />
                )}
              </div>

              <div className={getClass("field")}>
                <label className={getClass("label")}>
                  Imagem do banner (Mobile):
                </label>
                <label
                  htmlFor="image-upload-mobile"
                  className={`${getClass("selectInput")} ${
                    errors.banner_mobile ? getClass("inputError") : ""
                  }`}
                >
                  Selecionar Imagem Mobile
                </label>
                <input
                  type="file"
                  id="image-upload-mobile"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    setForm((prev) => ({ ...prev, banner_mobile: file }));
                    setShowImageEditorMobile(true);
                    if (errors.banner_mobile)
                      setErrors((prev: any) => ({
                        ...prev,
                        banner_mobile: false,
                      }));
                  }}
                />
                {errors.banner_mobile && (
                  <p className={getClass("errorText")}>
                    Banner mobile obrigatório
                  </p>
                )}
                {form.banner_mobile && (
                  <div className={getClass("previewContainer")}>
                    <div className={getClass("imgContainer")}>
                      <img
                        src={renderImagePreview(form.banner_mobile)}
                        alt="Imagem do banner mobile"
                        className={getClass("img")}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, banner_mobile: null }))
                        }
                      />
                    </div>
                  </div>
                )}
                {showImageEditorMobile && form.banner_mobile && (
                  <ImageEditor
                    aspectRatio={18 / 9}
                    minWidth={500}
                    minHeight={260}
                    file={form.banner_mobile}
                    onSave={(editedFile: any) => {
                      setForm((prev) => ({
                        ...prev,
                        banner_mobile: editedFile,
                      }));
                      setShowImageEditorMobile(false);
                    }}
                    onClose={() => setShowImageEditorMobile(false)}
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

export default BannerModal;
