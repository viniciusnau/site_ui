import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface ProfileState {
    data: any | null;
    loading: boolean;
    error: boolean;
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getProfile: (state) => {
            state.loading = true;
            state.error = false;
            state.data = null;
        },
        getProfileSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload;
        },
        getProfileFailure: (state) => {
            state.loading = false;
            state.error = true;
            state.data = null;
        },
    },
});

export const { getProfile, getProfileSuccess, getProfileFailure } = profileSlice.actions;

export default profileSlice.reducer;

export const fetchProfiles =
    () =>
        async (
            dispatch: (arg0: {
                payload: any;
                type: "profile/getProfile" | "profile/getProfileSuccess" | "profile/getProfileFailure";
            }) => void
        ) => {
            dispatch(getProfile());
            try {
                const response = await services.getProfiles();
                dispatch(getProfileSuccess(response.results));
            } catch (err) {
                console.log("err: ", err);
                dispatch(getProfileFailure());
            }
        };
