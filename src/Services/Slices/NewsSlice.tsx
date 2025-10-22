import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface NewsSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: NewsSliceState = {
  data: [],
  loading: true,
  error: false,
  msgError: ""
};

const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getNews: (state) => {
      state.error = false;
      state.loading = true;
    },
    getNewsSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getNewsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar notícias";
    },
    updateNews: (state) => {
      state.error = false;
      state.loading = true;
    },
    updateNewsSuccess: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateNewsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar notícia";
    },
    createNews: (state) => {
      state.error = false;
      state.loading = true;
    },
    createNewsSuccess: (state, action) => {
      state.data.push(action.payload);
      state.error = false;
      state.loading = false;
    },
    createNewsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar notícia";
    },
    deleteNews: (state) => {
      state.error = false;
      state.loading = true;
    },
    deleteNewsSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = false;
      state.loading = false;
    },
    deleteNewsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar notícia";
    },
  },
});

export const {
  getNews,
  getNewsFailure,
  getNewsSuccess,
  updateNews,
  updateNewsFailure,
  updateNewsSuccess,
  createNews,
  createNewsFailure,
  createNewsSuccess,
  deleteNews,
  deleteNewsFailure,
  deleteNewsSuccess,
} = NewsSlice.actions;

export default NewsSlice.reducer;

export const fetchNews = (published?: string) => async (
    dispatch: (arg0: {
      payload: any;
      type: "news/getNews" | "news/getNewsSuccess" | "news/getNewsFailure";
    }) => void
) => {
  dispatch(getNews());
  try {
    const data = await services.getNews(published);
    dispatch(getNewsSuccess(data));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(getNewsFailure(detailError));
    throw detailError;
  }
};

export const postNews = (payload: any) => async (dispatch: any) => {
  dispatch(createNews());
  try {
    const response = await services.postNews(payload);
    dispatch(createNewsSuccess(response));
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
    dispatch(createNewsFailure(detailError));
    throw detailError;
  }
};

export const patchNews = (payload: any, id: number) => async (dispatch: any) => {
  dispatch(updateNews());
  try {
    const response = await services.patchNews(payload, id);
    dispatch(updateNewsSuccess(response));
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
    dispatch(updateNewsFailure(detailError));
    throw detailError;
  }
};


export const removeNews = (id: number) => async(dispatch: any) =>{
    dispatch(deleteNews());
    try{
        await services.deleteNews(id)
        dispatch(deleteNewsSuccess(id))
    } catch(err: any){
        const detailError = err.response?.data || err.message
        console.log("err: ", detailError);
        dispatch(deleteNewsFailure(detailError))
        throw detailError;
    }
}