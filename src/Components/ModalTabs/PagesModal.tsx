import React, { useEffect } from "react";
import Modal from "../Modal/Modal";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {fetchCards} from "../../Services/Slices/CardsSlice";
import {fetchCategory} from "../../Services/Slices/CategorySlice";
import {fetchProfiles} from "../../Services/Slices/ProfilesSlice";

interface PageForm {
    card: string;
    category: string;
    allowed_users: number[];
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
    const dispatch = useDispatch();

    const cards = useSelector((state: any) => state.cardsSlice.data || []);
    const categories = useSelector((state: any) => state.categorySlice.data || []);
    const users = useSelector((state: any) => state.profilesSlice.data || []);

    const getClass = (base: string) => (customStyles[base] || "").trim();

    useEffect(() => {
        if (isOpen) {
            dispatch<any>(fetchCards());
            dispatch<any>(fetchCategory());
            dispatch<any>(fetchProfiles());
        }
    }, [isOpen, dispatch]);

    const handleSelect = (e: SelectChangeEvent, field: string) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleUsersChange = (e: any) => {
        const value = e.target.value as number[];
        setForm((prev) => ({ ...prev, allowed_users: value }));
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
        katex,
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
        <Modal isOpen={isOpen} onClose={onClose} withBackground customStyles={customStyles} title={title}>
            <div className={getClass("modalContainer")}>
                <div className={getClass("modalContentContainer")}>
                    <div className={getClass("modalBodyContainer")}>
                        <fieldset className={getClass("category")}>
                            <legend>Dados da Página</legend>

                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Título:</label>
                                <input
                                    className={`${getClass("input")} ${errors.title ? getClass("inputError") : ""}`}
                                    value={form.title}
                                    placeholder="Digite o título da página"
                                    maxLength={255}
                                    onChange={(e) => {
                                        handleChange(e.target.value, "title");
                                        if (errors.title) setErrors((prev: any) => ({ ...prev, title: false }));
                                    }}
                                />
                                {errors.title && <p className={getClass("errorText")}>Título obrigatório</p>}
                            </div>

                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Conteúdo:</label>
                                <SunEditor
                                    setOptions={editorOptions}
                                    lang="pt_br"
                                    setContents={editedHTML}
                                    onChange={(content) => handleChange(content, "text")}
                                />
                            </div>

                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Coleção:</label>
                                <FormControl fullWidth>
                                    <InputLabel id="card">Coleção</InputLabel>
                                    <Select
                                        labelId="card"
                                        value={form.card || ""}
                                        onChange={(e) => handleSelect(e, "card")}
                                    >
                                        <MenuItem value="">
                                            <em>Limpar coleção</em>
                                        </MenuItem>
                                        {cards.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id.toString()}>
                                                {item.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Categoria:</label>
                                <FormControl fullWidth>
                                    <InputLabel id="category">Categoria</InputLabel>
                                    <Select
                                        labelId="category"
                                        value={form.category || ""}
                                        onChange={(e) => handleSelect(e, "category")}
                                    >
                                        <MenuItem value="">
                                            <em>Limpar categoria</em>
                                        </MenuItem>
                                        {categories.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id.toString()}>
                                                {item.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Usuários Permitidos:</label>
                                <FormControl fullWidth>
                                    <InputLabel id="allowed_users">Usuários</InputLabel>
                                    <Select
                                        labelId="allowed_users"
                                        multiple
                                        value={form.allowed_users || []}
                                        onChange={handleUsersChange}
                                        renderValue={(selected) =>
                                            users
                                                .filter((u: any) => (selected as number[]).includes(u.pk))
                                                .map((u: any) => u.username || u.name)
                                                .join(", ")
                                        }
                                    >
                                        {users.map((user: any) => (
                                            <MenuItem key={user.pk} value={user.pk}>
                                                <Checkbox checked={form.allowed_users.includes(user.pk)} />
                                                <ListItemText primary={user.username || user.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={getClass("field")}>
                                <label className={getClass("label")}>Opções:</label>
                                <div className={getClass("checkboxContainer")}>
                                    {[
                                        { key: "has_faq", label: "FAQ" },
                                        { key: "has_news", label: "Notícias" },
                                        { key: "has_posters", label: "Cartilhas" },
                                        { key: "has_cores", label: "Núcleos" },
                                    ].map(({ key, label }) => (
                                        <div className={getClass("checkboxBackground")} key={key}>
                                            <label className={getClass("checkboxLabel")}>
                                                <input
                                                    className={getClass("inputCheckbox")}
                                                    type="checkbox"
                                                    checked={(form as any)[key]}
                                                    onChange={() =>
                                                        setForm((prev) => ({ ...prev, [key]: !prev[key as keyof PageForm] }))
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
                    <button className={`${getClass("button")} ${getClass("cancel")}`} onClick={onClose}>
                        {mode === "create" ? "Fechar" : "Cancelar"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default PagesModal;
