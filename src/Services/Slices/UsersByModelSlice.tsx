import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface UsersByModelState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: UsersByModelState = {
  data: [],
  loading: false,
  error: false,
};

const UsersByModelSlice = createSlice({
  name: "usersByModel",
  initialState,
  reducers: {
    getUsersByModel: (state)=>{
        state.data = [];
        state.loading = true;
        state.error = false;
    },
    getUsersByModelSuccess: (state, action)=>{
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    getUsersByModelFailure: (state)=>{
        state.loading = false;
        state.error = true;
    }
  },
});

export const {
    getUsersByModel,
    getUsersByModelFailure,
    getUsersByModelSuccess
} = UsersByModelSlice.actions

export default UsersByModelSlice.reducer;

export const fetchUsersByModel = (model: string) => async(
    dispatch: (arg0:{payload: any;
        type: "usersByModel/getUsersByModel" | "usersByModel/getUsersByModelSuccess" | "usersByModel/getUsersByModelFailure";
    }) => void 
) =>{
    dispatch(getUsersByModel());
    try {
      const data = await services.getUsersByModels(model);
      dispatch(getUsersByModelSuccess(data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getUsersByModelFailure());
    }
}