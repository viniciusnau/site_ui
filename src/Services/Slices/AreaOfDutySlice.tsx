import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface AreaOfDutySliceState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: AreaOfDutySliceState = {
  data: [],
  loading: false,
  error: false,
};

const AreaOfDutySlice = createSlice({
  name: "areaOfDuty",
  initialState,
  reducers: {
    getAreaOfDuty: (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    },
    getAreaOfDutySuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    getAreaOfDutyFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    updateAreaOfDuty: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateAreaOfDutySuccess: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.error = false;
      state.loading = false;
    },
    updateAreaOfDutyFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    createAreaOfDuty: (state) => {
      state.loading = true;
      state.error = false;
    },
    createAreaOfDutySuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    createAreaOfDutyFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteAreaOfDuty: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteAreaOfDutySuccess: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = false;
      state.loading = false;
    },
    deleteAreaOfDutyFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  getAreaOfDuty,
  getAreaOfDutyFailure,
  getAreaOfDutySuccess,
  deleteAreaOfDuty,
  deleteAreaOfDutyFailure,
  deleteAreaOfDutySuccess,
  createAreaOfDuty,
  createAreaOfDutyFailure,
  createAreaOfDutySuccess,
  updateAreaOfDuty,
  updateAreaOfDutyFailure,
  updateAreaOfDutySuccess,
} = AreaOfDutySlice.actions;

export default AreaOfDutySlice.reducer;

export const fetchAreaOfDuty =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "areaOfDuty/getAreaOfDuty" | "areaOfDuty/getAreaOfDutySuccess" | "areaOfDuty/getAreaOfDutyFailure";
    }) => void
  ) => {
    dispatch(getAreaOfDuty());
    try {
      const data = await services.getAreaOfDuty();
      dispatch(getAreaOfDutySuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getAreaOfDutyFailure());
    }
  };

export const patchAreaOfDuty = (payload: any, id: number) => async (dispatch: any) => {
  dispatch(updateAreaOfDuty());
  try {
    const response = await services.patchAreaOfDuty(payload, id);
    dispatch(updateAreaOfDutySuccess(response));
  } catch (err) {
    console.log(err);
    dispatch(updateAreaOfDutyFailure());
  }
};

export const postAreaOfDuty =
  (payload: string) => async (dispatch: any) => {
    dispatch(createAreaOfDuty());
    try {
      const response = await services.postAreaOfDuty(payload);
      dispatch(createAreaOfDutySuccess(response));
    } catch (err) {
      console.log(err);
      dispatch(createAreaOfDutyFailure());
    }
  };

export const removeAreaOfDuty = (id: number) => async (dispatch: any) => {
  dispatch(deleteAreaOfDuty());
  try {
    await services.deleteAreaOfDuty(id);
    dispatch(deleteAreaOfDutySuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteAreaOfDutyFailure());
  }
};