import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ADD_ITEMS } from '../../components/EndPointsLinks';
import { toast } from 'react-toastify';
import axios from 'axios';






//get data from api
export const getAllCartItems = createAsyncThunk('clients/getAllCartItems', async (args, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch(ADD_ITEMS);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert new items into cart 
export const insertItem = createAsyncThunk('clients/insertItem', async (URL_Cart, URL_Item, Quantity_Item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    await axios.post(ADD_ITEMS, {
        cart: URL_Cart,
        model_variant: URL_Item,
        quantity: Quantity_Item,
    })
        .then(function (response) {
            if (response.status === 201) {
                console.log("add items success");

            }
        })
        .catch(function (error) {
            console.log(rejectWithValue(error));
        });
});

//insert new items into cart 
export const insertItemRepair = createAsyncThunk('clients/insertItemRepair', async (URL_Cart, REPAIRS, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    await axios.post(ADD_ITEMS, {
        cart: URL_Cart,
        repairs: REPAIRS,
    }).then(function (response) {
        if (response.status === 201) {
            toast.success("Save Success", {
                theme: "dark",
            });

        }
    })
        .catch(function (error) {
            toast.error(rejectWithValue(error.message), {
                theme: "dark",
            });
        });


});

//delete client
export const deleteItem = createAsyncThunk('clients/deleteItem', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://pos-beta.onrender.com/api/cartitems/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        }).then((res) => {
            if (res.ok) {
                // toast.success("Delete successful", {
                //     theme: "dark",
                // });
                console.log("Delete successful");
            }
        });;
        return id;
    } catch (error) {
        // return rejectWithValue(error.message)
        toast.error(rejectWithValue(error.message), {
            theme: "dark",
        });
    }
});

//filter Client
export const FilterItems = createAsyncThunk('clients/FilterItems', async (item_ID, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://pos-beta.onrender.com/api/cartitems/${item_ID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        })
        return item_ID;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const ClientsSlice = createSlice({
    name: 'cartItems',
    initialState: {
        AllCartItems: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get order
        [getAllCartItems.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCartItems = action.payload;
        },
        [getAllCartItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //insert new item
        [insertItem.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertItem.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCartItems.results.push(action.payload);
        },
        [insertItem.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new item repair
        [insertItemRepair.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertItemRepair.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCartItems.results.push(action.payload);
        },
        [insertItemRepair.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete order
        [deleteItem.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteItem.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCartItems = state.AllCartItems.results.filter(cart => cart.id !== action.payload);
        },
        [deleteItem.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter Client
        [FilterItems.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllCartItems = state.AllCartItems.results.filter(item => item.id === action.payload);
        },
        [FilterItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default ClientsSlice.reducer;