import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface QuickAccessButtonsSliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: QuickAccessButtonsSliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const QuickAccessButtonsSlice = createSlice({
  name: "quickAccessButtons",
  initialState,
  reducers: {
    getQuickAccessButtons(state) {
      state.error = false;
      state.loading = true;
    },
    getQuickAccessButtonsSuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getQuickAccessButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar banner";
    },
    createQuickAccessButtons(state) {
      state.error = false;
      state.loading = true;
    },
    createQuickAccessButtonsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createQuickAccessButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar banner";
    },
    updateQuickAccessButtons(state) {
      state.error = false;
      state.loading = true;
    },
    updateQuickAccessButtonsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateQuickAccessButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar banner";
    },
    deleteQuickAccessButtons(state) {
      state.error = false;
      state.loading = true;
    },
    deleteQuickAccessButtonsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteQuickAccessButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar banner";
    },
  },
});

export const {
  getQuickAccessButtons,
  getQuickAccessButtonsFailure,
  getQuickAccessButtonsSuccess,
  updateQuickAccessButtons,
  updateQuickAccessButtonsFailure,
  updateQuickAccessButtonsSuccess,
  createQuickAccessButtons,
  createQuickAccessButtonsFailure,
  createQuickAccessButtonsSuccess,
  deleteQuickAccessButtons,
  deleteQuickAccessButtonsFailure,
  deleteQuickAccessButtonsSuccess,
} = QuickAccessButtonsSlice.actions;

export default QuickAccessButtonsSlice.reducer;

export const fetchQuickAccessButtons =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "quickAccessButtons/getQuickAccessButtons"
        | "quickAccessButtons/getQuickAccessButtonsSuccess"
        | "quickAccessButtons/getQuickAccessButtonsFailure";
    }) => void
  ) => {
    dispatch(getQuickAccessButtons());
    try {
      const data = await services.getQuickAccessButtons();
      dispatch(getQuickAccessButtonsSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getQuickAccessButtonsFailure(detailError));
      throw detailError;
    }
  };

export const postQuickAccessButtons = (payload: any) => async (dispatch: any) => {
  dispatch(createQuickAccessButtons());
  try {
    const response = await services.postQuickAccessButtons(payload);
    dispatch(createQuickAccessButtonsSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar botões de acesso rápido";
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
    dispatch(createQuickAccessButtonsFailure(detailError));
    throw detailError;
  }
};

export const patchQuickAccessButtons =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateQuickAccessButtons());
    try {
      const response = await services.patchQuickAccessButtons(payload, id);
      dispatch(updateQuickAccessButtonsSuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar botões de acesso rápido";
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
      dispatch(updateQuickAccessButtonsFailure(detailError));
      throw detailError;
    }
  };

export const removeQuickAccessButtons = (id: number) => async (dispatch: any) => {
  dispatch(deleteQuickAccessButtons());
  try {
    await services.deleteQuickAccessButtons(id);
    dispatch(deleteQuickAccessButtonsSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteQuickAccessButtonsFailure(detailError));
    throw detailError;
  }
};
