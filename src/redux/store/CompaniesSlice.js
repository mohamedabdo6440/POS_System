import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'





//get data from api
export const getAllCompanies = createAsyncThunk('companies/getAllCompanies', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://myphone-pos.onrender.com/api/device/companies');
        const data = await res.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert data into api
export const insertCompane = createAsyncThunk('companies/insertCompane', async (AddCompane, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://myphone-pos.onrender.com/api/device/companies', {
            method: 'POST',
            body: JSON.stringify(AddCompane),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//get Compane details from api
export const CompaneInfo = createAsyncThunk('companies/CompaneInfo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/companies/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete product
export const deleteCompane = createAsyncThunk('companies/deleteCompane', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/companies/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//filter products
export const FilterCompane = createAsyncThunk('companies/FilterCompane', async (word, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/companies?ordering=${word}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return word;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const CompaniesSlice = createSlice({
    name: 'companies',
    initialState: {
        AllCompanies: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get Compane
        [getAllCompanies.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllCompanies.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCompanies = action.payload;
        },
        [getAllCompanies.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get Compane details
        [CompaneInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [CompaneInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCompanies = state.AllCompanies.filter((comp) => comp.id === action.payload)
        },
        [CompaneInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new Compane
        [insertCompane.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertCompane.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCompanies.push(action.payload);
        },
        [insertCompane.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete Compane
        [deleteCompane.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteCompane.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCompanies = state.AllCompanies.filter(comp => comp.id !== action.payload);
        },
        [deleteCompane.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter Compane
        [FilterCompane.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterCompane.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCompanies = state.AllCompanies.filter(comp => comp.name === action.payload);
        },
        [FilterCompane.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default CompaniesSlice.reducer;