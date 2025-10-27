import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface Page {
    id: number;
    title: string;
    text: string;
    has_faq: boolean;
    has_news: boolean;
    has_posters: boolean;
    has_cores: boolean;
}

interface PagesSliceState {
    data: Page[];
    error: boolean;
    loading: boolean;
    msgError: string | Record<string, string[]>;
}

const initialState: PagesSliceState = {
    data: [],
    error: false,
    loading: false,
    msgError: "",
};

const PagesSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        getPages(state) {
            state.error = false;
            state.loading = true;
        },
        getPagesSuccess(state, action) {
            state.data = action.payload;
            state.error = false;
            state.loading = false;
        },
        getPagesFailure(state, action) {
            state.error = true;
            state.loading = false;
            state.msgError = action.payload || "Erro ao carregar páginas";
        },
        createPage(state) {
            state.loading = true;
        },
        createPageSuccess(state, action) {
            state.loading = false;
            state.data.push(action.payload);
        },
        createPageFailure(state, action) {
            state.loading = false;
            state.error = true;
            state.msgError = action.payload;
        },
        updatePage(state) {
            state.loading = true;
        },
        updatePageSuccess(state, action) {
            state.loading = false;
            state.data = state.data.map((p) =>
                p.id === action.payload.id ? action.payload : p
            );
        },
        updatePageFailure(state, action) {
            state.loading = false;
            state.error = true;
            state.msgError = action.payload;
        },
        deletePage(state) {
            state.loading = true;
        },
        deletePageSuccess(state, action) {
            state.loading = false;
            state.data = state.data.filter((p) => p.id !== action.payload);
        },
        deletePageFailure(state, action) {
            state.loading = false;
            state.error = true;
            state.msgError = action.payload;
        },
    },
});

export const {
    getPages,
    getPagesFailure,
    getPagesSuccess,
    createPage,
    createPageFailure,
    createPageSuccess,
    updatePage,
    updatePageFailure,
    updatePageSuccess,
    deletePage,
    deletePageFailure,
    deletePageSuccess,
} = PagesSlice.actions;

export default PagesSlice.reducer;

export const fetchPages = () => async (dispatch: any) => {
    dispatch(getPages());
    try {
        const data = await services.getPages();
        dispatch(getPagesSuccess(data));
    } catch (err: any) {
        dispatch(getPagesFailure(err.message));
    }
};

export const postPage = (payload: FormData) => async (dispatch: any) => {
    dispatch(createPage());
    try {
        const res = await services.postPage(payload);
        dispatch(createPageSuccess(res));
        return res;
    } catch (err: any) {
        dispatch(createPageFailure(err.message));
        throw err;
    }
};

export const patchPage = (payload: FormData, id: number) => async (dispatch: any) => {
    dispatch(updatePage());
    try {
        const res = await services.patchPage(payload, id);
        dispatch(updatePageSuccess(res));
        return res;
    } catch (err: any) {
        dispatch(updatePageFailure(err.message));
        throw err;
    }
};

export const removePage = (id: number) => async (dispatch: any) => {
    dispatch(deletePage());
    try {
        await services.deletePage(id);
        dispatch(deletePageSuccess(id));
    } catch (err: any) {
        dispatch(deletePageFailure(err.message));
        throw err;
    }
};
