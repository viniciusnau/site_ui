import { createSlice } from "@reduxjs/toolkit";
import services from "../services";
import axios from "axios";

// Interface para a resposta paginada
interface PaginatedResponse {
    results: any[];
    count: number;
    next: string | null;
    previous: string | null;
}

interface NewsPaginationSliceState {
    data: PaginatedResponse;
    loading: boolean;
    error: boolean;
    msgError: string | Record<string, string[]>;
}

const initialState: NewsPaginationSliceState = {
    data: {
        results: [],
        count: 0,
        next: null,
        previous: null
    },
    loading: true,
    error: false,
    msgError: ""
};

const NewsPaginationSlice = createSlice({
    name: "newsPagination",
    initialState,
    reducers: {
        getNewsPagination: (state) => {
            state.error = false;
            state.loading = true;
        },
        getNewsPaginationSuccess: (state, action) => {
            state.data = action.payload;
            state.error = false;
            state.loading = false;
        },
        getNewsPaginationFailure: (state, action) => {
            state.error = true;
            state.loading = false;
            state.msgError = action.payload || "Erro ao carregar notícias";
        },
        updateNewsPagination: (state) => {
            state.error = false;
            state.loading = true;
        },
        updateNewsPaginationSuccess: (state, action) => {
            // Atualiza um item específico na lista
            const index = state.data.results.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.data.results[index] = action.payload;
            }
            state.error = false;
            state.loading = false;
        },
        updateNewsPaginationFailure: (state, action) => {
            state.error = true;
            state.loading = false;
            state.msgError = action.payload || "Erro ao atualizar notícia";
        },
        createNewsPagination: (state) => {
            state.error = false;
            state.loading = true;
        },
        createNewsPaginationSuccess: (state, action) => {
            // Adiciona no início da lista
            state.data.results.unshift(action.payload);
            state.data.count += 1;
            state.error = false;
            state.loading = false;
        },
        createNewsPaginationFailure: (state, action) => {
            state.error = true;
            state.loading = false;
            state.msgError = action.payload || "Erro ao criar notícia";
        },
        deleteNewsPagination: (state) => {
            state.error = false;
            state.loading = true;
        },
        deleteNewsPaginationSuccess: (state, action) => {
            state.data.results = state.data.results.filter((item) => item.id !== action.payload);
            state.data.count -= 1;
            state.error = false;
            state.loading = false;
        },
        deleteNewsPaginationFailure: (state, action) => {
            state.error = true;
            state.loading = false;
            state.msgError = action.payload || "Erro ao deletar notícia";
        },
        // Adicione um reset para quando mudar de página
        resetNewsPagination: (state) => {
            state.data = initialState.data;
            state.loading = true;
            state.error = false;
            state.msgError = "";
        },
    },
});

export const {
    getNewsPagination, getNewsPaginationFailure, getNewsPaginationSuccess, createNewsPagination, createNewsPaginationFailure, createNewsPaginationSuccess, updateNewsPagination, updateNewsPaginationFailure, updateNewsPaginationSuccess, deleteNewsPagination, deleteNewsPaginationFailure, deleteNewsPaginationSuccess, resetNewsPagination, // Exporte o novo action
} = NewsPaginationSlice.actions;

export default NewsPaginationSlice.reducer;

// Thunk para buscar notícias paginadas
export const fetchNewsPagination = (published?: string, page?: number, pageSize?: number) => async (
    dispatch: (arg0: {
        payload: any;
        type: "newsPagination/getNewsPagination" | "newsPagination/getNewsPaginationSuccess" | "newsPagination/getNewsPaginationFailure";
    }) => void
) => {
    dispatch(getNewsPagination());
    try {
        const data = await services.getPaginationNews(published, page, pageSize);
        dispatch(getNewsPaginationSuccess(data));
    } catch (err: any) {
        const detailError = err.response?.data || err.message;
        console.log("Erro ao buscar notícias: ", detailError);
        dispatch(getNewsPaginationFailure(detailError));
        throw detailError;
    }
};

// Thunk para próxima página
export const fetchNextNewsPaginationPage = (url: string) => async (dispatch: any) => {
    dispatch(getNewsPagination());
    try {
        const response = await axios.get(url);
        dispatch(getNewsPaginationSuccess(response.data));
    } catch (err: any) {
        const detailError = err.response?.data || err.message;
        dispatch(getNewsPaginationFailure(detailError));
        throw detailError;
    }
};

// Thunk para criar notícia (use o endpoint correto)
export const postNewsPagination = (payload: any) => async (dispatch: any) => {
    dispatch(createNewsPagination());
    try {
        const response = await services.postPaginationNews(payload); // Use o endpoint correto
        dispatch(createNewsPaginationSuccess(response));
        return response;
    } catch (err: any) {
        console.log(err);
        const errors = err.response?.data;
        let detailError = "Erro ao criar notícia";
        if (errors) {
            if (errors.__all__) {
                detailError = errors.__all__[0];
            } else if (errors.title) {
                detailError = errors.title[0];
            } else {
                const firstKey = Object.keys(errors)[0];
                if (firstKey && Array.isArray(errors[firstKey])) {
                    detailError = errors[firstKey][0];
                }
            }
        }
        dispatch(createNewsPaginationFailure(detailError));
        throw detailError;
    }
};

// Thunk para atualizar notícia
export const patchNewsPagination = (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateNewsPagination());
    try {
        const response = await services.patchPaginationNews(payload, id); // Use o endpoint correto
        dispatch(updateNewsPaginationSuccess(response));
        return response;
    } catch (err: any) {
        console.log(err);
        const errors = err.response?.data;
        let detailError = "Erro ao atualizar notícia";
        if (errors) {
            if (errors.__all__) {
                detailError = errors.__all__[0];
            } else if (errors.title) {
                detailError = errors.title[0];
            } else {
                const firstKey = Object.keys(errors)[0];
                if (firstKey && Array.isArray(errors[firstKey])) {
                    detailError = errors[firstKey][0];
                }
            }
        }
        dispatch(updateNewsPaginationFailure(detailError));
        throw detailError;
    }
};

// Thunk para deletar notícia
export const removeNewsPagination = (id: number) => async (dispatch: any) => {
    dispatch(deleteNewsPagination());
    try {
        await services.deletePaginationNews(id); // Use o endpoint correto
        dispatch(deleteNewsPaginationSuccess(id));
    } catch (err: any) {
        const detailError = err.response?.data || err.message;
        console.log("Erro ao deletar notícia: ", detailError);
        dispatch(deleteNewsPaginationFailure(detailError));
        throw detailError;
    }
};