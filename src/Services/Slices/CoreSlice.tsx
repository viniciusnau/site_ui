import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface CoreSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: CoreSliceState = {
  data: [],
  loading: false,
  error: false,
};

const CoreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    getCore: (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    },
    getCoreSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    getCoreFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateCore: (state) => {
      state.error = false;
      state.loading = true;
    },
    updateCoreSuccess: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateCoreFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    createCore: (state) => {
      state.loading = true;
      state.error = false;
    },
    createCoreSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    createCoreFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteCore: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteCoreSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteCoreFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getCore,
  getCoreFailure,
  getCoreSuccess,
  updateCore,
  updateCoreFailure,
  updateCoreSuccess,
  createCore,
  createCoreFailure,
  createCoreSuccess,
  deleteCore,
  deleteCoreFailure,
  deleteCoreSuccess,
} = CoreSlice.actions;

export default CoreSlice.reducer;

export const fetchCore =
  (published?: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "core/getCore" | "core/getCoreSuccess" | "core/getCoreFailure";
    }) => void
  ) => {
    dispatch(getCore());
    try {
      const data = await services.getCore();
      dispatch(getCoreSuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getCoreFailure());
    }
  };

export const patchCore = (payload: any, id: number) => async (dispatch: any) => {
  dispatch(updateCore());
  try {
    const response = await services.patchCore(payload, id);
    dispatch(updateCoreSuccess(response));
  } catch (err) {
    console.log(err);
    dispatch(updateCoreFailure());
  }
};

export const postCore =
  (payload: string) => async (dispatch: any) => {
    dispatch(createCore());
    try {
      const response = await services.postCore(payload);
      dispatch(createCoreSuccess(response));
    } catch (err) {
      console.log(err);
      dispatch(createCoreFailure());
    }
  };

export const removeCore = (id: number) => async (dispatch: any) => {
  dispatch(deleteCore());
  try {
    await services.deleteCore(id);
    dispatch(deleteCoreSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteCoreFailure());
  }
};
