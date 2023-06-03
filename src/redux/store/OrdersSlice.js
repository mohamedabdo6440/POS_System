import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'





//get data from api
export const getAllOrders = createAsyncThunk('orders/getAllOrders', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://myphone-pos.onrender.com/api/orders');
        const data = await res.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert order into api
export const insertOrder = createAsyncThunk('orders/insertOrder', async (AddOrder, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://myphone-pos.onrender.com/api/orders', {
            method: 'POST',
            body: JSON.stringify(AddOrder),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//get order details from api
export const orderInfo = createAsyncThunk('orders/orderInfo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/orders/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete order
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/orders/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//filter order
export const FilterOrders = createAsyncThunk('orders/FilterOrders', async (word, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/orders?ordering=${word}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return word;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const OrdersSlice = createSlice({
    name: 'orders',
    initialState: {
        AllOrders: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get order
        [getAllOrders.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllOrders.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllOrders = action.payload;
        },
        [getAllOrders.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get order details
        [orderInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [orderInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllOrders = state.AllOrders.filter((order) => order.id === action.payload)
        },
        [orderInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new order
        [insertOrder.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllOrders.push(action.payload);
        },
        [insertOrder.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete order
        [deleteOrder.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllOrders = state.AllOrders.filter(order => order.id !== action.payload);
        },
        [deleteOrder.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter order
        [FilterOrders.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterOrders.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllOrders = state.AllOrders.filter(order => order.name === action.payload);
        },
        [FilterOrders.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default OrdersSlice.reducer;