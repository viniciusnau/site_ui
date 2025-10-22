import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { containerForm } from "../../Services/interfaces";
import ColorPicker from "../ColorPicker/ColorPicker";

type ContainerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: containerForm;
  errors: any;
  setErrors: any;
  setForm: React.Dispatch<React.SetStateAction<containerForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (value: any, type: string) => void;
  handleCancel?: () => void;
};

const ContainerModal = ({
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
}: ContainerModalProps) => {
  const getClass = (base: string) => {
    return (customStyles[base] || "").trim();
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
                <label className={getClass("label")}>Exibir título:</label>
                <div className={getClass("checkboxContainer")}>
                  {[true, false].map((value) => (
                    <div
                      className={getClass("checkboxBackground")}
                      key={value.toString()}
                    >
                      <label className={getClass("checkboxLabel")}>
                        <input
                          className={getClass("inputCheckbox")}
                          type="radio"
                          name="show_title"
                          value={value.toString()}
                          checked={form.show_title === value}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              show_title: e.target.value === "true",
                            }))
                          }
                        />

                        <p className={getClass("checkboxText")}>
                          {value === true ? "Sim" : "Não"}
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
                  placeholder="Digite o nome do texto alternativo"
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
                <label className={getClass("label")}>Cor do título:</label>
                <ColorPicker
                  value={form.title_color}
                  onChange={(color: string) =>
                    handleChange(color, "title_color")
                  }
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>Plano de fundo:</label>
                <ColorPicker
                  value={form.background_color}
                  onChange={(color: string) =>
                    handleChange(color, "background_color")
                  }
                />
              </div>
              <div className={getClass("field")}>
                <label className={getClass("label")}>
                  Botão de redirecionamento:
                </label>
                <input
                  className={`${getClass("input")}`}
                  value={form.redirect_button}
                  placeholder="Digite a página de redirecionamento"
                  maxLength={255}
                  onChange={(e) =>
                    handleChange(e.target.value, "redirect_button")
                  }
                />
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

export default ContainerModal;
