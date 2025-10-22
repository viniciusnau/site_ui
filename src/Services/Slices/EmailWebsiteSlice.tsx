import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface EmailWebsiteState {
  data: any[];
  error: boolean;
  loading: boolean;
}

const initialState: EmailWebsiteState = {
  data: [],
  error: false,
  loading: false,
};

const EmailWebsiteSlice = createSlice({
  name: "emailWebsite",
  initialState,
  reducers: {
    getEmailWebsite: (state) => {
      state.data = [];
      state.error = false;
      state.loading = true;
    },
    getEmailWebsiteSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getEmailWebsiteFailure: (state) => {
      state.data = [];
      state.error = true;
      state.loading = false;
    },
    updateEmailWebsite: (state) => {
      state.data = [];
      state.error = false;
      state.loading = true;
    },
    updateEmailWebsiteSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    updateEmailWebsiteFailure: (state) => {
      state.data = [];
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  getEmailWebsite,
  getEmailWebsiteFailure,
  getEmailWebsiteSuccess,
  updateEmailWebsite,
  updateEmailWebsiteFailure,
  updateEmailWebsiteSuccess,
} = EmailWebsiteSlice.actions;

export default EmailWebsiteSlice.reducer;

export const fetchEmailWebsite =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "emailWebsite/getEmailWebsite"
        | "emailWebsite/getEmailWebsiteSuccess"
        | "emailWebsite/getEmailWebsiteFailure";
    }) => void
  ) => {
    dispatch(getEmailWebsite());
    try {
      const data = await services.getEmailWebsite();
      dispatch(getEmailWebsiteSuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getEmailWebsiteFailure());
    }
  };

export const patchEmailWebsite =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateEmailWebsite());
    try {
      const response = await services.patchEmailWebsite(payload, id);
      dispatch(updateEmailWebsiteSuccess(response));
    } catch (err) {
      console.log(err);
      dispatch(updateEmailWebsiteFailure());
    }
  };
