import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'





//get data from api
export const getAllUsers = createAsyncThunk('users/getAllUsers', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://myphone-pos.onrender.com/api/users');
        const data = await res.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert user into api
export const insertUser = createAsyncThunk('users/insertUser', async (AddUsers, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://myphone-pos.onrender.com/api/users', {
            method: 'POST',
            body: JSON.stringify(AddUsers),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//get user details from api
export const usersInfo = createAsyncThunk('users/usersInfo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/users/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//filter user
export const FilterUsers = createAsyncThunk('users/FilterUsers', async (word, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/users?ordering=${word}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return word;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        AllUsers: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get user
        [getAllUsers.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllUsers = action.payload;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get user details
        [usersInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [usersInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllUsers = state.AllUsers.filter((user) => user.id === action.payload)
        },
        [usersInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new user
        [insertUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllUsers.push(action.payload);
        },
        [insertUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete user
        [deleteUser.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllUsers = state.AllUsers.filter(user => user.id !== action.payload);
        },
        [deleteUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter user
        [FilterUsers.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllUsers = state.AllUsers.filter(user => user.username === action.payload);
        },
        [FilterUsers.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default UsersSlice.reducer;