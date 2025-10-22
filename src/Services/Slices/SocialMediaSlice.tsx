import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface SocialMediaState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: SocialMediaState = {
  data: [],
  loading: false,
  error: false,
};

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    getSocialMedia: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getSocialMediaSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getSocialMediaFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
    updateSocialMedia: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    updateSocialMediaSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    updateSocialMediaFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
    getSocialMedia,
    getSocialMediaFailure,
    getSocialMediaSuccess,
    updateSocialMedia,
    updateSocialMediaFailure,
    updateSocialMediaSuccess,
    } = socialMediaSlice.actions

export default socialMediaSlice.reducer

export const fetchSocialMedia = () =>
    async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "socialMedia/getSocialMedia"
        | "socialMedia/getSocialMediaSuccess"
        | "socialMedia/getSocialMediaFailure";
    }) => void
  ) => {
        dispatch(getSocialMedia());
        try{
            const data = await services.getSocialMedia();
            dispatch(getSocialMediaSuccess(data));
        } catch (err) {
            console.log("err: ", err);
            dispatch(getSocialMediaFailure());
        }
}

export const patchSocialMedia = (payload: any, id: number) =>
    async(dispatch: any) => {
        dispatch(updateSocialMedia());
        try{
            const response = await services.patchSocialMedia(payload, id);
            dispatch(updateSocialMediaSuccess(response));
        }catch(err){
            console.log(err);
            dispatch(updateSocialMediaFailure());
        }
}