import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sell: false,
    buy: false,
    repair: false,

}
const CustomerSliceCart = createSlice({
    name: "CustomerSliceCart",
    initialState,
    reducers: {
        GET_SELL: (state, action) => {
            state.sell = action.payload
        },

    }
})
export let { GET_SELL } = CustomerSliceCart.actions
export default CustomerSliceCart.reducer