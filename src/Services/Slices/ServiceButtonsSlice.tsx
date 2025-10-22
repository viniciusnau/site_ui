import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface ServiceButtonsSliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: ServiceButtonsSliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const ServiceButtonsSlice = createSlice({
  name: "serviceButtons",
  initialState,
  reducers: {
    getServiceButtons(state) {
      state.error = false;
      state.loading = true;
    },
    getServiceButtonsSuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getServiceButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar o botão de serviço";
    },
    createServiceButtons(state) {
      state.error = false;
      state.loading = true;
    },
    createServiceButtonsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createServiceButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar o botão de serviço";
    },
    updateServiceButtons(state) {
      state.error = false;
      state.loading = true;
    },
    updateServiceButtonsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateServiceButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar o botão de serviço";
    },
    deleteServiceButtons(state) {
      state.error = false;
      state.loading = true;
    },
    deleteServiceButtonsSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteServiceButtonsFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar o botão de serviço";
    },
  },
});

export const {
    getServiceButtons,getServiceButtonsFailure,getServiceButtonsSuccess,updateServiceButtons,updateServiceButtonsFailure,updateServiceButtonsSuccess,deleteServiceButtons,deleteServiceButtonsFailure,deleteServiceButtonsSuccess,createServiceButtons,createServiceButtonsFailure,createServiceButtonsSuccess,
} = ServiceButtonsSlice.actions;

export default ServiceButtonsSlice.reducer;

export const fetchServiceButtons =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "serviceButtons/getServiceButtons"
        | "serviceButtons/getServiceButtonsSuccess"
        | "serviceButtons/getServiceButtonsFailure";
    }) => void
  ) => {
    dispatch(getServiceButtons());
    try {
      const data = await services.getServiceButtons();
      dispatch(getServiceButtonsSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getServiceButtonsFailure(detailError));
      throw detailError;
    }
  };

export const postServiceButtons = (payload: any) => async (dispatch: any) => {
  dispatch(createServiceButtons());
  try {
    const response = await services.postServiceButtons(payload);
    dispatch(createServiceButtonsSuccess(response));
    return response;
} catch (err: any) {
  console.log("Erro ao criar botão:", err);

  const errors = err.response?.data || err.data || err;
  let detailError = "Erro ao criar o botão de serviço";

  if (errors) {
    if (errors.__all__ && Array.isArray(errors.__all__)) {
      detailError = errors.__all__[0];
    } else if (errors.title && Array.isArray(errors.title)) {
      detailError = errors.title[0];
    } else {
      const firstKey = Object.keys(errors)[0];
      if (firstKey && Array.isArray(errors[firstKey])) {
        detailError = errors[firstKey][0];
      }
    }
  }

  dispatch(createServiceButtonsFailure(detailError));
  throw detailError;
}

};

export const patchServiceButtons =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateServiceButtons());
    try {
      const response = await services.patchServiceButtons(payload, id);
      dispatch(updateServiceButtonsSuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar o botão de serviço";
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
      dispatch(updateServiceButtonsFailure(detailError));
      throw detailError;
    }
  };

export const removeServiceButtons = (id: number) => async (dispatch: any) => {
  dispatch(deleteServiceButtons());
  try {
    await services.deleteServiceButtons(id);
    dispatch(deleteServiceButtonsSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteServiceButtonsFailure(detailError));
    throw detailError;
  }
};
