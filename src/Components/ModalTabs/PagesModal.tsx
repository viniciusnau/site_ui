import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";

interface PageForm {
    title: string;
    text: string;
    has_faq: boolean;
    has_news: boolean;
    has_posters: boolean;
    has_cores: boolean;
}

type PagesModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    form: PageForm;
    editedHTML: string;
    errors: any;
    setErrors: any;
    setForm: React.Dispatch<React.SetStateAction<PageForm>>;
    onSubmit: () => void;
    mode: "create" | "edit";
    customStyles?: { [key: string]: string };
    handleChange: (value: any, type: string) => void;
    handleCancel?: () => void;
};

const PagesModal = ({
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
                    }: PagesModalProps) => {
    const getClass = (base: string) => {
        return (customStyles[base] || "").trim();
    };

    const editorOptions = {
        height: "400",
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
        colorList: [
            "#828282",
            "#FF5400",
            "#676464",
            "#F1F2F4",
            "#FF9B00",
            "#F00",
            "#fa6e30",
            "#000",
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
                            <legend>Dados da Página</legend>

                            {/* Título */}
                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Título:</label>
                                <input
                                    className={`${getClass("input")} ${
                                        errors.title ? getClass("inputError") : ""
                                    }`}
                                    value={form.title}
                                    placeholder="Digite o título da página"
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

                            {/* Conteúdo */}
                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Conteúdo:</label>
                                <SunEditor
                                    setOptions={editorOptions}
                                    lang="pt_br"
                                    setContents={editedHTML}
                                    onChange={(content) => handleChange(content, "text")}
                                />
                            </div>

                            {/* Checkboxes */}
                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Opções:</label>
                                <div className={getClass("checkboxContainer")}>
                                    {[
                                        { key: "has_faq", label: "FAQ" },
                                        { key: "has_news", label: "Notícias" },
                                        { key: "has_posters", label: "Cartilhas" },
                                        { key: "has_cores", label: "Cores" },
                                    ].map(({ key, label }) => (
                                        <div className={getClass("checkboxBackground")} key={key}>
                                            <label className={getClass("checkboxLabel")}>
                                                <input
                                                    className={getClass("inputCheckbox")}
                                                    type="checkbox"
                                                    checked={(form as any)[key]}
                                                    onChange={() =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            [key]: !prev[key as keyof PageForm],
                                                        }))
                                                    }
                                                />
                                                <p className={getClass("checkboxText")}>{label}</p>
                                            </label>
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

export default PagesModal;
