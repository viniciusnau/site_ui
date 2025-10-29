import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface CardRegisterSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: CardRegisterSliceState = {
  data: [],
  loading: true,
  error: false,
  msgError: "",
};

const CardRegisterSlice = createSlice({
  name: "cardRegister",
  initialState,
  reducers: {
    getCardRegister: (state) => {
      state.error = false;
      state.loading = true;
    },
    getCardRegisterSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getCardRegisterFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar registros";
    },
    updateCardRegister: (state) => {
      state.error = false;
      state.loading = true;
    },
    updateCardRegisterSuccess: (state, action) => {
      state.data = state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateCardRegisterFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar registro de card";
    },
    createCardRegister: (state) => {
      state.error = false;
      state.loading = true;
    },
    createCardRegisterSuccess: (state, action) => {
      state.data.push(action.payload);
      state.error = false;
      state.loading = false;
    },
    createCardRegisterFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar registro de card";
    },
    deleteCardRegister: (state) => {
      state.error = false;
      state.loading = true;
    },
    deleteCardRegisterSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = false;
      state.loading = false;
    },
    deleteCardRegisterFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar registro de card";
    },
  },
});

export const {
  getCardRegister,
  getCardRegisterFailure,
  getCardRegisterSuccess,
  updateCardRegister,
  updateCardRegisterFailure,
  updateCardRegisterSuccess,
  createCardRegister,
  createCardRegisterFailure,
  createCardRegisterSuccess,
  deleteCardRegister,
  deleteCardRegisterFailure,
  deleteCardRegisterSuccess,
} = CardRegisterSlice.actions;

export default CardRegisterSlice.reducer;

export const fetchCardRegister = () => async (
    dispatch: (arg0: {
      payload: any;
      type:
          | "cardRegister/getCardRegister"
          | "cardRegister/getCardRegisterSuccess"
          | "cardRegister/getCardRegisterFailure";
    }) => void
) => {
  dispatch(getCardRegister());
  try {
    const data = await services.getCardRegister();
    dispatch(getCardRegisterSuccess(data));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(getCardRegisterFailure(detailError));
    throw detailError;
  }
};

export const postCardRegister = (payload: any) => async (dispatch: any) => {
  dispatch(createCardRegister());
  try {
    const response = await services.postCardRegister(payload);
    dispatch(createCardRegisterSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar registro de card";
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
    dispatch(createCardRegisterFailure(detailError));
    throw detailError;
  }
};

export const patchCardRegister =
    (payload: any, id: number) => async (dispatch: any) => {
      dispatch(updateCardRegister());
      try {
        const response = await services.patchCardRegister(payload, id);
        dispatch(updateCardRegisterSuccess(response));
        return response;
      } catch (err: any) {
        console.log(err);
        const errors = err.response?.data;
        let detailError = "Erro ao atualizar registro de card";
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
        dispatch(updateCardRegisterFailure(detailError));
        throw detailError;
      }
    };

export const removeCardRegister = (id: number) => async (dispatch: any) => {
  dispatch(deleteCardRegister());
  try {
    await services.deleteCardRegister(id);
    dispatch(deleteCardRegisterSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteCardRegisterFailure(detailError));
    throw detailError;
  }
};
