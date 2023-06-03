import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'





//get data from api
export const getAllSeries = createAsyncThunk('series/getAllSeries', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://myphone-pos.onrender.com/api/device/series');
        const data = await res.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert user into api
export const insertSeries = createAsyncThunk('series/insertSeries', async (AddSeries, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://myphone-pos.onrender.com/api/device/series', {
            method: 'POST',
            body: JSON.stringify(AddSeries),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//get user details from api
export const seriesInfo = createAsyncThunk('series/seriesInfo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/series/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete user
export const deleteSeries = createAsyncThunk('series/deleteSeries', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/series/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//filter series
export const FilterSeries = createAsyncThunk('series/FilterSeries', async (word, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/series?ordering=${word}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return word;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const SeriesSlice = createSlice({
    name: 'series',
    initialState: {
        AllSeries: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get series
        [getAllSeries.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllSeries.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllSeries = action.payload;
        },
        [getAllSeries.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get series details
        [seriesInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [seriesInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllSeries = state.AllSeries.filter((ser) => ser.id === action.payload)
        },
        [seriesInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new series
        [insertSeries.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertSeries.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllUsers.push(action.payload);
        },
        [insertSeries.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete series
        [deleteSeries.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteSeries.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllSeries = state.AllSeries.filter(ser => ser.id !== action.payload);
        },
        [deleteSeries.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter series
        [FilterSeries.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterSeries.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllSeries = state.AllSeries.filter(ser => ser.name === action.payload);
        },
        [FilterSeries.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default SeriesSlice.reducer;