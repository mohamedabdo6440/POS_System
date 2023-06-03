import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CARTS } from '../../components/EndPointsLinks';






//get data from api
export const getAllCarts = createAsyncThunk('clients/getAllCarts', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch(CARTS);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert carts into api
export const insertCart = createAsyncThunk('clients/insertCart', async (AddCart, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(CARTS, {
            method: 'POST',
            body: JSON.stringify(AddCart),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete client
export const deleteCarts = createAsyncThunk('clients/deleteCarts', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(CARTS + "/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//filter Client
export const FilterCarts = createAsyncThunk('clients/FilterCarts', async (ID, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://pos-beta.onrender.com/api/carts?ordering=${ID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return ID;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const ClientsSlice = createSlice({
    name: 'carts',
    initialState: {
        AllCarts: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get order
        [getAllCarts.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllCarts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCarts = action.payload;
        },
        [getAllCarts.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //insert new order
        [insertCart.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCarts.results.push(action.payload);
        },
        [insertCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete order
        [deleteCarts.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteCarts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCarts = state.AllCarts.results.filter(cart => cart.id !== action.payload);
        },
        [deleteCarts.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter Client
        [FilterCarts.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterCarts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCarts = state.AllCarts.results.filter(cart => cart.id === action.payload);
        },
        [FilterCarts.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default ClientsSlice.reducer;