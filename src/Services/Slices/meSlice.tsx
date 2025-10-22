import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface MeState {
  data: any | null;
  loading: boolean;
  error: boolean;
}

interface Body {
  username: string;
  password: string;
}

const initialState: MeState = {
  data: null,
  loading: false,
  error: false,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    getMe: (state) => {
      state.loading = true;
      state.error = false;
      state.data = null;
    },
    getMeSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getMeFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = null;
    },
  },
});

export const { getMe, getMeSuccess, getMeFailure } = meSlice.actions;

export default meSlice.reducer;

export const fetchMe =
  (body: Body) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "me/getMe" | "me/getMeSuccess" | "me/getMeFailure";
    }) => void
  ) => {
    dispatch(getMe());
    try {
      const response = await services.getMe(body);
      dispatch(getMeSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getMeFailure());
    }
  };
