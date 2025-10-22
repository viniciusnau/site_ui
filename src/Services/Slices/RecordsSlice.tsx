import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface RecordsSliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: RecordsSliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const RecordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    getRecords(state) {
      state.error = false;
      state.loading = true;
    },
    getRecordsSuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getRecordsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar Cadastro";
    },
    createRecords(state) {
      state.error = false;
      state.loading = true;
    },
    createRecordsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createRecordsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar Cadastro";
    },
    updateRecords(state) {
      state.error = false;
      state.loading = true;
    },
    updateRecordsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateRecordsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar Cadastro";
    },
    deleteRecords(state) {
      state.error = false;
      state.loading = true;
    },
    deleteRecordsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteRecordsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar Cadastro";
    },
  },
});

export const {
  getRecords,
  getRecordsFailure,
  getRecordsSuccess,
  updateRecords,
  updateRecordsFailure,
  updateRecordsSuccess,
  createRecords,
  createRecordsFailure,
  createRecordsSuccess,
  deleteRecords,
  deleteRecordsFailure,
  deleteRecordsSuccess,
} = RecordsSlice.actions;

export default RecordsSlice.reducer;

export const fetchRecords =
  (id?:number) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "records/getRecords"
        | "records/getRecordsSuccess"
        | "records/getRecordsFailure";
    }) => void
  ) => {
    dispatch(getRecords());
    try {
      const data = await services.getRecords();
      dispatch(getRecordsSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getRecordsFailure(detailError));
      throw detailError;
    }
  };

export const postRecords = (payload: any) => async (dispatch: any) => {
  dispatch(createRecords());
  try {
    const response = await services.postRecords(payload);
    dispatch(createRecordsSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar cadastro";
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
    dispatch(createRecordsFailure(detailError));
    throw detailError;
  }
};

export const patchRecords =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateRecords());
    try {
      const response = await services.patchRecords(payload, id);
      dispatch(updateRecordsSuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar cadastro";
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
      dispatch(updateRecordsFailure(detailError));
      throw detailError;
    }
  };

export const removeRecords = (id: number) => async (dispatch: any) => {
  dispatch(deleteRecords());
  try {
    await services.deleteRecords(id);
    dispatch(deleteRecordsSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteRecordsFailure(detailError));
    throw detailError;
  }
};
