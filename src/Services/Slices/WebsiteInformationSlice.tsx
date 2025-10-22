import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface WebsiteInformatioState {
    data: any[];
    loading: boolean;
    error: boolean;
}

const initialState: WebsiteInformatioState = {
    data: [],
    loading: false,
    error: false,
}

const websiteInformationSlice = createSlice({
    name: "websiteInformation",
    initialState,
    reducers:{
        getWebsiteInformation: (state) => {
            state.loading = true;
            state.error = false;
            state.data = [];
        },
        getWebsiteInformationSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload;
        },
        getWebsiteInformationFailure: (state) => {
            state.loading = false;
            state.error = true;
            state.data = [];
        },
        updateWebsiteInformation: (state) =>{
            state.loading = true;
            state.error = false;
        },
        updateWebsiteInformationSuccess: (state, action) =>{
            state.loading = false;
            state.error = false;
            state.data = action.payload;
        },
        updateWebsiteInformationFailure: (state) =>{
            state.loading = false;
            state.error = true;
        },
    },
});

export const {
    getWebsiteInformation, 
    getWebsiteInformationSuccess, 
    getWebsiteInformationFailure,
    updateWebsiteInformation,
    updateWebsiteInformationSuccess,
    updateWebsiteInformationFailure,
    } = websiteInformationSlice.actions

export default websiteInformationSlice.reducer

export const fetchWebsiteInformation = () =>
    async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "websiteInformation/getWebsiteInformation"
        | "websiteInformation/getWebsiteInformationSuccess"
        | "websiteInformation/getWebsiteInformationFailure";
    }) => void
  ) => {
        dispatch(getWebsiteInformation());
        try{
            const data = await services.getWebsiteInformation();
            dispatch(getWebsiteInformationSuccess(data));
        } catch (err) {
            console.log("err: ", err);
            dispatch(getWebsiteInformationFailure());
        }
}

export const patchWebsiteInformation = (payload: any) =>
    async(dispatch: any) => {
        dispatch(updateWebsiteInformation());
        try{
            const response = await services.patchWebsiteInformation(payload);
            dispatch(updateWebsiteInformationSuccess(response));
        }catch(err){
            console.log(err);
            dispatch(updateWebsiteInformationFailure());
        }
}