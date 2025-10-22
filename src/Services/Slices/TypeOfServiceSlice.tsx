import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface TypeOfServiceSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: TypeOfServiceSliceState = {
  data: [],
  loading: false,
  error: false,
};

const TypeOfServiceSlice = createSlice({
  name: "typeOfService",
  initialState,
  reducers: {
    getTypeOfService: (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    },
    getTypeOfServiceSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    getTypeOfServiceFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    updateTypeOfService: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateTypeOfServiceSuccess: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateTypeOfServiceFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    createTypeOfService: (state) => {
      state.loading = true;
      state.error = false;
    },
    createTypeOfServiceSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    createTypeOfServiceFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteTypeOfService: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteTypeOfServiceSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = false;
      state.loading = false;
    },
    deleteTypeOfServiceFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  getTypeOfService,
  getTypeOfServiceFailure,
  getTypeOfServiceSuccess,
  updateTypeOfService,
  updateTypeOfServiceFailure,
  updateTypeOfServiceSuccess,
  createTypeOfService,
  createTypeOfServiceFailure,
  createTypeOfServiceSuccess,
  deleteTypeOfService,
  deleteTypeOfServiceFailure,
  deleteTypeOfServiceSuccess,
} = TypeOfServiceSlice.actions;

export default TypeOfServiceSlice.reducer;

export const fetchTypeOfService=
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "typeOfService/getTypeOfService"
        | "typeOfService/getTypeOfServiceSuccess"
        | "typeOfService/getTypeOfServiceFailure";
    }) => void
  ) => {
    dispatch(getTypeOfService());
    try {
      const data = await services.getTypeOfService();
      dispatch(getTypeOfServiceSuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getTypeOfServiceFailure());
    }
  };

export const patchTypeOfService =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateTypeOfService());
    try {
      const response = await services.patchTypeOfService(payload, id);
      dispatch(updateTypeOfServiceSuccess(response));
    } catch (err) {
      console.log(err);
      dispatch(updateTypeOfServiceFailure());
    }
  };

export const postTypeOfService = (payload: string) => async (dispatch: any) => {
  dispatch(createTypeOfService());
  try {
    const response = await services.postTypeOfService(payload);
    dispatch(createTypeOfServiceSuccess(response));
  } catch (err) {
    console.log(err);
    dispatch(createTypeOfServiceFailure());
  }
};

export const removeTypeOfService = (id: number) => async (dispatch: any) => {
  dispatch(deleteTypeOfService());
  try {
    await services.deleteTypeOfService(id);
    dispatch(deleteTypeOfServiceSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteTypeOfServiceFailure());
  }
};
