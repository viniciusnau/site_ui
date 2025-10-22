import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface SubcategorySliceState {
  data: any[];
  error: boolean;
  loading: boolean;
  msgError: string | Record<string, string[]>;
}

const initialState: SubcategorySliceState = {
  data: [],
  error: false,
  loading: false,
  msgError: "",
};

const SubcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    getSubCategory(state) {
      state.error = false;
      state.loading = true;
    },
    getSubCategorySuccess(state, action) {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    getSubCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao carregar Sub categoria";
    },
    createSubCategory(state) {
      state.error = false;
      state.loading = true;
    },
    createSubCategorySuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data.push(action.payload);
    },
    createSubCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao criar Sub categoria";
    },
    updateSubCategory(state) {
      state.error = false;
      state.loading = true;
    },
    updateSubCategorySuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateSubCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao atualizar Sub categoria";
    },
    deleteSubCategory(state) {
      state.error = false;
      state.loading = true;
    },
    deleteSubCategorySuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteSubCategoryFailure(state, action) {
      state.error = true;
      state.loading = false;
      state.msgError = action.payload || "Erro ao deletar Sub categoria";
    },
  },
});

export const {
  getSubCategory,
  getSubCategoryFailure,
  getSubCategorySuccess,
  updateSubCategory,
  updateSubCategoryFailure,
  updateSubCategorySuccess,
  createSubCategory,
  createSubCategoryFailure,
  createSubCategorySuccess,
  deleteSubCategory,
  deleteSubCategoryFailure,
  deleteSubCategorySuccess,
} = SubcategorySlice.actions;

export default SubcategorySlice.reducer;

export const fetchSubcategory =
  (id?: number) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "subcategory/getSubCategory"
        | "subcategory/getSubCategorySuccess"
        | "subcategory/getSubCategoryFailure";
    }) => void
  ) => {
    dispatch(getSubCategory());
    try {
      const data = await services.getSubCategory();
      dispatch(getSubCategorySuccess(data));
    } catch (err: any) {
      const detailError = err.response?.data || err.message;
      console.log("err: ", detailError);
      dispatch(getSubCategoryFailure(detailError));
      throw detailError;
    }
  };

export const postSubcategory = (payload: any) => async (dispatch: any) => {
  dispatch(createSubCategory());
  try {
    const response = await services.postSubCategory(payload);
    dispatch(createSubCategorySuccess(response));
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
    dispatch(createSubCategoryFailure(detailError));
    throw detailError;
  }
};

export const patchSubcategory =
  (payload: any, id: number) => async (dispatch: any) => {
    dispatch(updateSubCategory());
    try {
      const response = await services.patchSubCategory(payload, id);
      dispatch(updateSubCategorySuccess(response));
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
      dispatch(updateSubCategoryFailure(detailError));
      throw detailError;
    }
  };

export const removeSubcategory = (id: number) => async (dispatch: any) => {
  dispatch(deleteSubCategory());
  try {
    await services.deleteSubCategory(id);
    dispatch(deleteSubCategorySuccess(id));
  } catch (err: any) {
    const detailError = err.response?.data || err.message;
    console.log("err: ", detailError);
    dispatch(deleteSubCategoryFailure(detailError));
    throw detailError;
  }
};
