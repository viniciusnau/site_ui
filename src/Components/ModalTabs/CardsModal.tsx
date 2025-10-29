import React from "react";
import Modal from "../Modal/Modal";
import {cardsForm} from "../../Services/interfaces";

type CardsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: cardsForm;
  errors: any;
  setErrors: any;
  setForm: React.Dispatch<React.SetStateAction<cardsForm>>;
  onSubmit: () => void;
  mode: "create" | "edit";
  customStyles?: { [key: string]: string };
  handleChange: (value: any, type: string) => void;
  handleCancel?: () => void;
};

const CardsModal = ({
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
                    }: CardsModalProps) => {
  const getClass = (base: string) => (customStyles[base] || "").trim();

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
                <legend>Dados da Coleção</legend>
                <div className={getClass("field")}>
                  <label className={getClass("label")}>Título:</label>
                  <input
                      className={`${getClass("input")} ${
                          errors.title ? getClass("inputError") : ""
                      }`}
                      value={form.title}
                      placeholder="Digite o título da coleção"
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
            </div>
          </div>

          <div className={getClass("modalButtonContainer")}>
            <button className={getClass("button")} onClick={onSubmit}>
              {mode === "create" ? "Criar" : "Salvar"}
            </button>
            <button
                className={`${getClass("button")} ${getClass("cancel")}`}
                onClick={handleCancel || onClose}
            >
              {mode === "create" ? "Fechar" : "Cancelar"}
            </button>
          </div>
        </div>
      </Modal>
  );
};

export default CardsModal;
