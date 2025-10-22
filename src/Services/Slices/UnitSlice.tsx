import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface UnitSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: UnitSliceState = {
  data: [],
  loading: false,
  error: false,
};

const UnitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    getUnit: (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    },
    getUnitSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    getUnitFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    updateUnit: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateUnitSuccess: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateUnitFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    createUnit: (state) => {
      state.loading = true;
      state.error = false;
    },
    createUnitSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    createUnitFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteUnit: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteUnitSuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = false;
      state.loading = false;
    },
    deleteUnitFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  getUnit,
  getUnitFailure,
  getUnitSuccess,
  createUnit,
  createUnitFailure,
  createUnitSuccess,
  updateUnit,
  updateUnitFailure,
  updateUnitSuccess,
  deleteUnit,
  deleteUnitFailure,
  deleteUnitSuccess,
} = UnitSlice.actions;

export default UnitSlice.reducer;

export const fetchUnit =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "unit/getUnit" | "unit/getUnitSuccess" | "unit/getUnitFailure";
    }) => void
  ) => {
    dispatch(getUnit());
    try {
      const data = await services.getUnit();
      dispatch(getUnitSuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getUnitFailure());
    }
  };

export const patchUnit =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateUnit());
    try {
      const response = await services.patchUnit(payload, id);
      dispatch(updateUnitSuccess(response));
    } catch (err) {
      console.log(err);
      dispatch(updateUnitFailure());
    }
  };

export const postUnit = (payload: any) => async (dispatch: any) => {
  dispatch(createUnit());
  try {
    const response = await services.postUnit(payload);
     if (!response || (response as any).error) {
      throw response;
    }
    dispatch(createUnitSuccess(response));
    return response;
  } catch (err) {
    console.log(err);
    dispatch(createUnitFailure());
    throw err;
  }
};

export const removeUnit = (id: number) => async (dispatch: any) => {
  dispatch(deleteUnit());
  try {
    await services.deleteUnit(id);
    dispatch(deleteUnitSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteUnitFailure());
  }
};
