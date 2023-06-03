import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'





//get data from api
export const getAllModels = createAsyncThunk('models/getAllModels', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://myphone-pos.onrender.com/api/device/models');
        const data = await res.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert model into api
export const insertModel = createAsyncThunk('models/insertModel', async (AddModel, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://myphone-pos.onrender.com/api/device/models', {
            method: 'POST',
            body: JSON.stringify(AddModel),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//get models details from api
export const modelInfo = createAsyncThunk('models/modelInfo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/models/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete model
export const deleteModel = createAsyncThunk('models/deleteModel', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/models/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//filter models
export const FilterModels = createAsyncThunk('models/FilterModels', async (word, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/models?ordering=${word}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return word;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const ModelsSlice = createSlice({
    name: 'models',
    initialState: {
        AllModels: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get model
        [getAllModels.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllModels.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllModels = action.payload;
        },
        [getAllModels.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get order model
        [modelInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [modelInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllModels = state.AllModels.filter((model) => model.id === action.payload)
        },
        [modelInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new model
        [insertModel.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertModel.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllModels.push(action.payload);
        },
        [insertModel.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete model
        [deleteModel.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteModel.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllModels = state.AllModels.filter(model => model.id !== action.payload);
        },
        [deleteModel.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter model
        [FilterModels.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterModels.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllModels = state.AllModels.filter(model => model.name === action.payload);
        },
        [FilterModels.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default ModelsSlice.reducer;