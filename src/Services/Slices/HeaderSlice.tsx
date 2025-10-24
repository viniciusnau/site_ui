import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface HeaderSliceState {
  data: any[];
  error: boolean;
  loading: boolean;
}

const initialState: HeaderSliceState = {
  data: [],
  error: false,
  loading: false,
};

const HeaderSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    getHeader(state) {
      state.error = false;
      state.loading = true;
    },
    getHeaderSuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getHeaderFailure(state, action) {
      state.error = true;
      state.loading = false;
    },
    createHeader(state) {
      state.error = false;
      state.loading = true;
    },
    createHeaderSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createHeaderFailure(state, action) {
      state.error = true;
      state.loading = false;
    },
    updateHeader(state) {
      state.error = false;
      state.loading = true;
    },
    updateHeaderSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateHeaderFailure(state, action) {
      state.error = true;
      state.loading = false;
    },
    deleteHeader(state) {
      state.error = false;
      state.loading = true;
    },
    deleteHeaderSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteHeaderFailure(state, action) {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  getHeader,
  getHeaderFailure,
  getHeaderSuccess,
  createHeader,
  createHeaderFailure,
  createHeaderSuccess,
  deleteHeader,
  deleteHeaderFailure,
  deleteHeaderSuccess,
  updateHeader,
  updateHeaderFailure,
  updateHeaderSuccess,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;

export const fetchHeader =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "header/getHeader"
        | "header/getHeaderSuccess"
        | "header/getHeaderFailure";
    }) => void
  ) => {
    dispatch(getHeader());
    try {
      const data = await services.getHeader();
      dispatch(getHeaderSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getHeaderFailure(detailError));
      throw detailError;
    }
  };

export const postHeader = (payload: any) => async (dispatch: any) => {
  dispatch(createHeader());
  try {
    const response = await services.postHeader(payload);
    dispatch(createHeaderSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar Header";
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
    dispatch(createHeaderFailure(detailError));
    throw detailError;
  }
};

export const patchHeader =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateHeader());
    try {
      const response = await services.patchHeader(payload, id);
      dispatch(updateHeaderSuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar Header";
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
      dispatch(updateHeaderFailure(detailError));
      throw detailError;
    }
  };

export const removeHeader = (id: number) => async (dispatch: any) => {
  dispatch(deleteHeader());
  try {
    await services.deleteHeader(id);
    dispatch(deleteHeaderSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteHeaderFailure(detailError));
    throw detailError;
  }
};
