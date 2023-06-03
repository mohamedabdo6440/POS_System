import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'





//get data from api
export const getAllClients = createAsyncThunk('clients/getAllClients', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://myphone-pos.onrender.com/api/clients');
        const data = await res.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert client into api
export const insertClients = createAsyncThunk('clients/insertClients', async (AddOrder, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://myphone-pos.onrender.com/api/clients', {
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


//get client details from api
export const ClientInfo = createAsyncThunk('clients/ClientInfo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/clients/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete client
export const deleteClient = createAsyncThunk('clients/deleteClient', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/clients/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//filter Client
export const FilterClient = createAsyncThunk('clients/FilterClient', async (word, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/clients?ordering=${word}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return word;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const ClientsSlice = createSlice({
    name: 'clients',
    initialState: {
        AllClients: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get order
        [getAllClients.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllClients.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllClients = action.payload;
        },
        [getAllClients.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get order details
        [ClientInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [ClientInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllClients = state.AllClients.filter((clint) => clint.id === action.payload)
        },
        [ClientInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new order
        [insertClients.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertClients.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllClients.push(action.payload);
        },
        [insertClients.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete order
        [deleteClient.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteClient.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllClients = state.AllClients.filter(clint => clint.id !== action.payload);
        },
        [deleteClient.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter Client
        [FilterClient.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterClient.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllClients = state.AllClients.filter(clint => clint.name === action.payload);
        },
        [FilterClient.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default ClientsSlice.reducer;