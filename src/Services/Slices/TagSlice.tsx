import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface TagSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: TagSliceState = {
  data: [],
  loading: false,
  error: false,
  msgError: "",
};

const TagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    getTag: (state) => {
      state.error = false;
      state.loading = true;
    },
    getTagSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getTagFailure: (state, action) => {
      state.data = [];
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Falha ao buscar as tags";
    },
    updateTag: (state) => {
      state.error = false;
      state.loading = true;
    },
    updateTagSuccess: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateTagFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Falha ao atualizar tag";
    },
    createTag: (state) => {
      state.loading = true;
      state.error = false;
    },
    createTagSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    createTagFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Falha ao criar tag";
    },
    deleteTag: (state) => {
      state.error = false;
      state.loading = true;
    },
    deleteTagSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = false;
      state.loading = false;
    },
    deleteTagFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Falha ao deletar tag";
    },
  },
});

export const {
  getTag,
  getTagFailure,
  getTagSuccess,
  createTag,
  createTagFailure,
  createTagSuccess,
  updateTag,
  updateTagFailure,
  updateTagSuccess,
  deleteTag,
  deleteTagFailure,
  deleteTagSuccess,
} = TagSlice.actions;

export default TagSlice.reducer;

export const fetchTag =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "tag/getTag" | "tag/getTagSuccess" | "tag/getTagFailure";
    }) => void
  ) => {
    dispatch(getTag());
    try {
      const data = await services.getTag();
      dispatch(getTagSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getTagFailure(detailError));
    }
  };

export const postTag = (payload: any) => async (dispatch: any) => {
  dispatch(createTag());
  try {
    const response = await services.postTag(payload);
    dispatch(createTagSuccess(response));
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
    dispatch(createTagFailure(detailError));
    throw detailError;
  }
};

export const patchTag = (payload: any, id: number) => async (dispatch: any) => {
  dispatch(updateTag());
  try {
    const response = await services.patchTag(payload, id);
    dispatch(updateTagSuccess(response));
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
    dispatch(updateTagFailure(detailError));
    throw detailError;
  }
};

export const removeTag = (id: number) => async (dispatch: any) => {
  dispatch(deleteTag());
  try {
    await services.deleteTag(id);
    dispatch(deleteTagSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteTagFailure(detailError));
  }
};
