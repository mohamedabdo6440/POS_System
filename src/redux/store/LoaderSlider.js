import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,

}
const LoaderSlider = createSlice({
    name: "LoaderSlider",
    initialState,
    reducers: {
        OPEN_LOADING: (state, action) => {
            state.loading = true
        },
        CLOSE_LOADING: (state, action) => {
            state.loading = false
        },

    }
})
export let { OPEN_LOADING,CLOSE_LOADING } = LoaderSlider.actions
export default LoaderSlider.reducer