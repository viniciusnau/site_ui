import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface CoresAndUnitsSliceState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: CoresAndUnitsSliceState = {
  data: [],
  loading: false,
  error: false,
};

const CoresAndUnitsSlice = createSlice({
  name: "coresAndUnits",
  initialState,
  reducers: {
    getCoresAndUnits: (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    },
    getCoresAndUnitsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    getCoresAndUnitsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getCoresAndUnits,
  getCoresAndUnitsFailure,
  getCoresAndUnitsSuccess,
} = CoresAndUnitsSlice.actions;

export default CoresAndUnitsSlice.reducer;

export const fetchCoresAndUnits =
  (published?: string) =>
  async (
    dispatch: (arg: {
      payload: any;
      type: "coresAndUnits/getCoresAndUnits" | "coresAndUnits/getCoresAndUnitsSuccess" | "coresAndUnits/getCoresAndUnitsFailure";
    }) => void
  ) => {
    dispatch(getCoresAndUnits());
    try {
      const data = await services.getUnityAndCores(published);
      dispatch(getCoresAndUnitsSuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getCoresAndUnitsFailure());
    }
  };