import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface CategorySliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: CategorySliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategory(state) {
      state.error = false;
      state.loading = true;
    },
    getCategorySuccess(state, action) {
      const payload = action.payload;
      state.data = Array.isArray(payload) ? payload : [payload];
      state.error = false;
      state.loading = false;
    },

    getCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar categoria";
    },
    createCategory(state) {
      state.error = false;
      state.loading = true;
    },
    createCategorySuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar categoria";
    },
    updateCategory(state) {
      state.error = false;
      state.loading = true;
    },
    updateCategorySuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar categoria";
    },
    deleteCategory(state) {
      state.error = false;
      state.loading = true;
    },
    deleteCategorySuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar categoria";
    },
  },
});

export const {
  getCategory,
  getCategoryFailure,
  getCategorySuccess,
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
} = CategorySlice.actions;

export default CategorySlice.reducer;

export const fetchCategory =
  (id?: number[]) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "category/getCategory"
        | "category/getCategorySuccess"
        | "category/getCategoryFailure";
    }) => void
  ) => {
    dispatch(getCategory());
    try {
      const data = await services.getCategory(id);
      dispatch(getCategorySuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getCategoryFailure(detailError));
      throw detailError;
    }
  };

export const postCategory = (payload: any) => async (dispatch: any) => {
  dispatch(createCategory());
  try {
    const response = await services.postCategory(payload);
    dispatch(createCategorySuccess(response));
    return response;
  } catch (err: any) {
    console.log(err);
    const errors = err.response?.data;
    let detailError = "Erro ao criar categoria";
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
    dispatch(createCategoryFailure(detailError));
    throw detailError;
  }
};

export const patchCategory =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateCategory());
    try {
      const response = await services.patchCategory(payload, id);
      dispatch(updateCategorySuccess(response));
      return response;
    } catch (err: any) {
      console.log(err);
      const errors = err.response?.data;
      let detailError = "Erro ao atualizar categoria";
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
      dispatch(updateCategoryFailure(detailError));
      throw detailError;
    }
  };

export const removeCategory = (id: number) => async (dispatch: any) => {
  dispatch(deleteCategory());
  try {
    await services.deleteCategory(id);
    dispatch(deleteCategorySuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteCategoryFailure(detailError));
    throw detailError;
  }
};
