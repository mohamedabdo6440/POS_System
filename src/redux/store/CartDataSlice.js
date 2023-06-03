import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: false,

}
const CartDataSlice = createSlice({
    name: "CartData",
    initialState,
    reducers: {
        GET_DATA: (state, action) => {
            state.data = action.payload
        },

    }
})
export let { GET_DATA } = CartDataSlice.actions
export default CartDataSlice.reducer