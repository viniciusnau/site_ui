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
    CreateButtonConfig, BooleanColumnConfig,
} from "../../../types/tableTypes";
import style from "../Posters/Posters.module.css";
import {news} from "../../../Components/TableInterfaces";


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

function Pages() {
    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.pagesSlice.data);

    const [form, setForm] = useState<PageForm>({
        title: "",
        text: "",
        has_faq: false,
        has_news: false,
        has_posters: false,
        has_cores: false,
        card: "",
        category: "",
        allowed_users: [],
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
            card: "",
            category: "",
            allowed_users: [],
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
        setForm((prev: any) => ({ ...prev, [key]: value }));
        if (key === "text") setEditedHTML(value);
    };

    const handleSubmit = async () => {
        try {
            if (!form.title.trim()) {
                setErrors((prev) => ({ ...prev, title: true }));
                return;
            }

            const formData = new FormData();

            Object.entries(form)
                .filter(([key]) => !["author", "published_at"].includes(key))
                .forEach(([key, value]) => {
                    const fieldName = key === "allowed_users" ? "allowed_users_ids" : key;

                    if (Array.isArray(value)) {
                        value.forEach((v) => formData.append(fieldName, v.toString()));
                    } else {
                        formData.append(
                            fieldName,
                            value != null ? value.toString() : ""
                        );
                    }
                });

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
        { key: "title", header: "Título", sortable: false },
        {
            key: "allowed_users",
            header: "Usuários",
            sortable: false,
            render: (row) =>
                row.allowed_users && row.allowed_users.length > 0
                    ? row.allowed_users.map((u: any) => u.name).join(", ")
                    : "Nenhum",
        },
    ];

    const actions: ActionsColumnConfig<any> = {
        enabled: true,
        header: "Ações",
        width: "150px",
        permissions: { canEdit: true, canDelete: true, canCreate: true, canView: true },
        view: {
            enabled: ((item: any) => Boolean(item.path)) as any,
            onClick: (item) => {
                const baseUrl = window.location.origin;
                window.open(`${baseUrl}${item.path}`, "_blank");
            },
        },
        edit: {
            onClick: (item) => {
                setSelectedItem(item);
                const allowedUserIds = item.allowed_users
                    ? item.allowed_users.map((u: any) => u.pk)
                    : [];

                setForm({
                    ...item,
                    allowed_users: allowedUserIds,
                });

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

    const booleanConfig: BooleanColumnConfig<news>[] = [
        {
            enabled: true,
            header: "Status",
            field: "status",
            checkValue: "published",
            xValue: "not_published",
            scheduledValue: "scheduled",
            width: "50px",
            sortable: false,
        }
    ];

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
                booleanColumns={booleanConfig}
                createButton={createButton}
                dateColumn={{
                    enabled: true,
                    header: "Criado em",
                    dateField: "created_at",
                    width: "120px",
                    sortable: true,
                }}
                searchable
                sortable
                pagination
                itemsPerPage={6}
            />
        </>
    );
}

export default Pages;
