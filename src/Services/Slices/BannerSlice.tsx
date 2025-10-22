import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface BannerSliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: BannerSliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const BannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    getBanner(state) {
      state.error = false;
      state.loading = true;
    },
    getBannerSuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getBannerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar banner";
    },
    createBanner(state) {
      state.error = false;
      state.loading = true;
    },
    createBannerSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createBannerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar banner";
    },
    updateBanner(state) {
      state.error = false;
      state.loading = true;
    },
    updateBannerSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateBannerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar banner";
    },
    deleteBanner(state) {
      state.error = false;
      state.loading = true;
    },
    deleteBannerSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteBannerFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar banner";
    },
  },
});

export const {
  getBanner,
  getBannerFailure,
  getBannerSuccess,
  createBanner,
  createBannerFailure,
  createBannerSuccess,
  deleteBanner,
  deleteBannerFailure,
  deleteBannerSuccess,
  updateBanner,
  updateBannerFailure,
  updateBannerSuccess,
} = BannerSlice.actions;

export default BannerSlice.reducer;

export const fetchBanner =
  (published?: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "banner/getBanner"
        | "banner/getBannerSuccess"
        | "banner/getBannerFailure";
    }) => void
  ) => {
    dispatch(getBanner());
    try {
      const data = await services.getBanner(published);
      dispatch(getBannerSuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getBannerFailure(detailError));
      throw detailError;
    }
  };

export const postBanner = (payload: any) => async (dispatch: any) => {
  dispatch(createBanner());
  try {
    const response = await services.postBanner(payload);
    dispatch(createBannerSuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar banner";
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
    dispatch(createBannerFailure(detailError));
    throw detailError;
  }
};

export const patchBanner =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateBanner());
    try {
      const response = await services.patchBanner(payload, id);
      dispatch(updateBannerSuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar banner";
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
      dispatch(updateBannerFailure(detailError));
      throw detailError;
    }
  };

export const removeBanner = (id: number) => async (dispatch: any) => {
  dispatch(deleteBanner());
  try {
    await services.deleteBanner(id);
    dispatch(deleteBannerSuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteBannerFailure(detailError));
    throw detailError;
  }
};
