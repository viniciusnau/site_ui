import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface ContainerSliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: ContainerSliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const ContainerSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    getContainer(state) {
      state.error = false;
      state.loading = true;
    },
    getContainerSuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getContainerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar container";
    },
    createContainer(state) {
      state.error = false;
      state.loading = true;
    },
    createContainerSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createContainerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar container";
    },
    updateContainer(state) {
      state.error = false;
      state.loading = true;
    },
    updateContainerSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateContainerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar container";
    },
    deleteContainer(state) {
      state.error = false;
      state.loading = true;
    },
    deleteContainerSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteContainerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar container";
    },
  },
});

export const {
  getContainer,
  getContainerFailure,
  getContainerSuccess,
  createContainer,
  createContainerFailure,
  createContainerSuccess,
  updateContainer,
  updateContainerFailure,
  updateContainerSuccess,
  deleteContainer,
  deleteContainerFailure,
  deleteContainerSuccess,
} = ContainerSlice.actions;

export default ContainerSlice.reducer;

export const fetchContainer =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "container/getContainer"
        | "container/getContainerSuccess"
        | "container/getContainerFailure";
    }) => void
  ) => {
    dispatch(getContainer());
    try {
      const data = await services.getContainer();
      dispatch(getContainerSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getContainerFailure(detailError));
      throw detailError;
    }
  };

export const postContainer = (payload: any) => async (dispatch: any) => {
  dispatch(createContainer());
  try {
    const response = await services.postContainer(payload);
    dispatch(createContainerSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar container";
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
    dispatch(createContainerFailure(detailError));
    throw detailError;
  }
};

export const patchContainer =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateContainer());
    try {
      const response = await services.patchContainer(payload, id);
      dispatch(updateContainerSuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar container";
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
      dispatch(updateContainerFailure(detailError));
      throw detailError;
    }
  };

export const removeContainer = (id: number) => async (dispatch: any) => {
  dispatch(deleteContainer());
  try {
    await services.deleteContainer(id);
    dispatch(deleteContainerSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteContainerFailure(detailError));
    throw detailError;
  }
};
