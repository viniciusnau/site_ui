import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface CardsSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: CardsSliceState = {
  data: [],
  loading: true,
  error: false,
  msgError: ""
};

const CardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    getCards: (state) => {
      state.error = false;
      state.loading = true;
    },
    getCardsSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getCardsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar coleção";
    },
    updateCards: (state) => {
      state.error = false;
      state.loading = true;
    },
    updateCardsSuccess: (state, action) => {
      state.data = state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateCardsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar card";
    },
    createCards: (state) => {
      state.error = false;
      state.loading = true;
    },
    createCardsSuccess: (state, action) => {
      state.data.push(action.payload);
      state.error = false;
      state.loading = false;
    },
    createCardsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar card";
    },
    deleteCards: (state) => {
      state.error = false;
      state.loading = true;
    },
    deleteCardsSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = false;
      state.loading = false;
    },
    deleteCardsFailure: (state, action) => {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar card";
    },
  },
});

export const {
  getCards,
  getCardsFailure,
  getCardsSuccess,
  updateCards,
  updateCardsFailure,
  updateCardsSuccess,
  createCards,
  createCardsFailure,
  createCardsSuccess,
  deleteCards,
  deleteCardsFailure,
  deleteCardsSuccess,
} = CardsSlice.actions;

export default CardsSlice.reducer;

export const fetchCards = (id?: string) => async (
    dispatch: (arg0: {
      payload: any;
      type: "cards/getCards" | "cards/getCardsSuccess" | "cards/getCardsFailure";
    }) => void
) => {
  dispatch(getCards());
  try {
    const data = await services.getCards(id);
    dispatch(getCardsSuccess(data));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(getCardsFailure(detailError));
    throw detailError;
  }
};

export const postCards = (payload: any) => async (dispatch: any) => {
  dispatch(createCards());
  try {
    const response = await services.postCards(payload);
    dispatch(createCardsSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar card";
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
    dispatch(createCardsFailure(detailError));
    throw detailError;
  }
};

export const patchCards = (payload: any, id: number) => async (dispatch: any) => {
  dispatch(updateCards());
  try {
    const response = await services.patchCards(payload, id);
    dispatch(updateCardsSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao atualizar card";
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
    dispatch(updateCardsFailure(detailError));
    throw detailError;
  }
};

export const removeCards = (id: number) => async (dispatch: any) => {
  dispatch(deleteCards());
  try {
    await services.deleteCards(id);
    dispatch(deleteCardsSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteCardsFailure(detailError));
    throw detailError;
  }
};
