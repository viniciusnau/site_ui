import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../../../Components/Snackbar/Snackbar";
import PagesModal from "../../../Components/ModalTabs/PagesModal";
import {
    fetchPages,
    patchPage,
    postPage,
    removePage,
} from "../../../Services/Slices/PagesSlice";
import {
    TableColumn,
    ActionsColumnConfig,
    CreateButtonConfig,
} from "../../../types/tableTypes";
import style from "../Posters/Posters.module.css";

function Pages() {
    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.pagesSlice.data);

    const [form, setForm] = useState({
        title: "",
        text: "",
        has_faq: false,
        has_news: false,
        has_posters: false,
        has_cores: false,
    });
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({ title: false });
    const [editedHTML, setEditedHTML] = useState("");
    const [snackbarType, setSnackbarType] = useState<string | null>(null);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);

    const resetForm = () => {
        setForm({
            title: "",
            text: "",
            has_faq: false,
            has_news: false,
            has_posters: false,
            has_cores: false,
        });
        setEditedHTML("");
        setErrors({ title: false });
    };

    const handleCloseModal = () => {
        resetForm();
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleChange = (value: any, key: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (key === "text") setEditedHTML(value);
    };

    const handleSubmit = async () => {
        try {
            if (!form.title.trim()) {
                setErrors((prev) => ({ ...prev, title: true }));
                return;
            }

            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) =>
                formData.append(key, String(value))
            );

            let response;
            if (modalMode === "edit" && selectedItem) {
                response = await dispatch(patchPage(formData, selectedItem.id));
            } else {
                response = await dispatch(postPage(formData));
            }

            if (response?.error || response?.status >= 400) {
                throw new Error("Erro ao salvar página");
            }

            await dispatch(fetchPages());

            if (modalMode === "edit") {
                setSnackbarType("patchSuccess");
                setSnackbarMessage("Página atualizada com sucesso!");
            } else {
                setSnackbarType("postSuccess");
                setSnackbarMessage("Página criada com sucesso!");
            }

            handleCloseModal();
        } catch (err: any) {
            console.error("Erro ao enviar página:", err);
            const errorMessage =
                err?.message || "Ocorreu um erro ao processar a requisição.";

            if (modalMode === "edit") {
                setSnackbarType("patchError");
                setSnackbarMessage(errorMessage);
            } else {
                setSnackbarType("postError");
                setSnackbarMessage(errorMessage);
            }

            handleCloseModal();
        }
    };

    const handleDelete = async (item: any) => {
        try {
            await dispatch(removePage(item.id));
            await dispatch(fetchPages());
            setSnackbarType("deleteSuccess");
            setSnackbarMessage("Página excluída com sucesso!");
        } catch (err: any) {
            console.error("Erro ao excluir página:", err);
            setSnackbarType("deleteError");
            setSnackbarMessage("Erro ao excluir página.");
        }
    };

    const columns: TableColumn<any>[] = [
        { key: "title", header: "Título", sortable: true },
    ];

    const actions: ActionsColumnConfig<any> = {
        enabled: true,
        header: "Ações",
        width: "150px",
        permissions: { canEdit: true, canDelete: true, canCreate: true },
        edit: {
            onClick: (item) => {
                setSelectedItem(item);
                setForm(item);
                setEditedHTML(item.text || "");
                setModalMode("edit");
                setIsModalOpen(true);
            },
        },
        delete: {
            confirmMessage: "Tem certeza que deseja excluir esta página?",
            onClick: handleDelete,
        },
    };

    const createButton: CreateButtonConfig = {
        text: "Criar nova Página",
        onClick: () => {
            resetForm();
            setModalMode("create");
            setIsModalOpen(true);
        },
    };

    return (
        <>
            {snackbarType === "noneChange" && (
                <Snackbar
                    type="noneChange"
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            )}
            {snackbarType === "postSuccess" && (
                <Snackbar
                    type="postSuccess"
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            )}
            {snackbarType === "postError" && (
                <Snackbar
                    type="postError"
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            )}
            {snackbarType === "patchSuccess" && (
                <Snackbar
                    type="patchSuccess"
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            )}
            {snackbarType === "patchError" && (
                <Snackbar
                    type="patchError"
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            )}
            {snackbarType === "deleteSuccess" && (
                <Snackbar
                    type="deleteSuccess"
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            )}
            {snackbarType === "deleteError" && (
                <Snackbar
                    type="deleteError"
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            )}

            <PagesModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === "create" ? "Criar Página" : "Editar Página"}
                form={form}
                editedHTML={editedHTML}
                errors={errors}
                setErrors={setErrors}
                setForm={setForm}
                onSubmit={handleSubmit}
                mode={modalMode}
                handleChange={handleChange}
                customStyles={style}
            />

            <Table
                data={data}
                columns={columns}
                actionsColumn={actions}
                createButton={createButton}
                searchable
                sortable
                pagination
                itemsPerPage={6}
            />
        </>
    );
}

export default Pages;
