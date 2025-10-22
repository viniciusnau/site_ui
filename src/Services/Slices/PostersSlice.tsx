import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface PostersSliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: PostersSliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const PostersSlice = createSlice({
  name: "posters",
  initialState,
  reducers: {
    getPosters(state) {
      state.error = false;
      state.loading = true;
    },
    getPostersSuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getPostersFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar posters";
    },
    createPosters(state) {
      state.error = false;
      state.loading = true;
    },
    createPostersSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createPostersFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar poster";
    },
    updatePosters(state) {
      state.error = false;
      state.loading = true;
    },
    updatePostersSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updatePostersFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar poster";
    },
    deletePosters(state) {
      state.error = false;
      state.loading = true;
    },
    deletePostersSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deletePostersFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar poster";
    },
  },
});

export const {
  getPosters,
  getPostersFailure,
  getPostersSuccess,
  createPosters,
  createPostersFailure,
  createPostersSuccess,
  updatePosters,
  updatePostersFailure,
  updatePostersSuccess,
  deletePosters,
  deletePostersFailure,
  deletePostersSuccess,
} = PostersSlice.actions;

export default PostersSlice.reducer;

export const fetchPosters =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "posters/getPosters"
        | "posters/getPostersSuccess"
        | "posters/getPostersFailure";
    }) => void
  ) => {
    dispatch(getPosters());
    try {
      const data = await services.getPosters();
      dispatch(getPostersSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getPostersFailure(detailError));
      throw detailError;
    }
  };

export const postPosters = (payload: any) => async (dispatch: any) => {
  dispatch(createPosters());
  try {
    const response = await services.postPosters(payload);
    dispatch(createPostersSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar poster";
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
    dispatch(createPostersFailure(detailError));
    throw detailError;
  }
};

export const patchPosters =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updatePosters());
    try {
      const response = await services.patchPosters(payload, id);
      dispatch(updatePostersSuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar poster";
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
      dispatch(updatePostersFailure(detailError));
      throw detailError;
    }
  };

export const removePosters = (id: number) => async (dispatch: any) => {
  dispatch(deletePosters());
  try {
    await services.deletePosters(id);
    dispatch(deletePostersSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deletePostersFailure(detailError));
    throw detailError;
  }
};
