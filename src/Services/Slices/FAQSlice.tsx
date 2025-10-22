import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface FAQState {
  data: any[];
  error: boolean;
  loading: boolean;
}

const initialState: FAQState = {
  data: [],
  error: false,
  loading: false,
};

const FAQSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    getFaq: (state) => {
      state.data = [];
      state.error = false;
      state.loading = true;
    },
    getFaqSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getFaqFailure: (state) => {
      state.error = true;
      state.loading = false;
    },

    updateFaq: (state) => {
      state.error = false;
      state.loading = true;
    },
    updateFaqSuccess: (state, action) => {
        state.data = state.data.map((item) =>
    item.id === action.payload.id ? action.payload : item
  );
      state.error = false;
      state.loading = false;
    },
    updateFaqFailure: (state) => {
      state.error = true;
      state.loading = false;
    },

    createFaq: (state) => {
      state.loading = true;
      state.error = false;
    },
    createFaqSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    createFaqFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    deleteFaq: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteFaqSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteFaqFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getFaq,
  getFaqFailure,
  getFaqSuccess,
  updateFaq,
  updateFaqFailure,
  updateFaqSuccess,
  createFaq,
  createFaqFailure,
  createFaqSuccess,
  deleteFaq,
  deleteFaqFailure,
  deleteFaqSuccess,
} = FAQSlice.actions;

export default FAQSlice.reducer;

export const fetchFaq =
  (published?: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "faq/getFaq" | "faq/getFaqSuccess" | "faq/getFaqFailure";
    }) => void
  ) => {
    dispatch(getFaq());
    try {
      const data = await services.getFAQ(published);
      dispatch(getFaqSuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getFaqFailure());
    }
  };

export const patchFaq = (payload: any, id: number) => async (dispatch: any) => {
  dispatch(updateFaq());
  try {
    const response = await services.patchFAQ(payload, id);
    dispatch(updateFaqSuccess(response));
  } catch (err) {
    console.log(err);
    dispatch(updateFaqFailure());
  }
};

export const postFaq =
  (payload: { question: string; answer: string }) => async (dispatch: any) => {
    dispatch(createFaq());
    try {
      const response = await services.postFAQ(payload);
      dispatch(createFaqSuccess(response));
    } catch (err) {
      console.log(err);
      dispatch(createFaqFailure());
    }
  };

export const removeFaq = (id: number) => async (dispatch: any) => {
  dispatch(deleteFaq());
  try {
    await services.deleteFAQ(id);
    dispatch(deleteFaqSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteFaqFailure());
  }
};
