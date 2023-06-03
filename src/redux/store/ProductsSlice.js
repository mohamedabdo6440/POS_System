import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


//get data from api
export const getAllProducts = createAsyncThunk('products/getAllProducts', async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://myphone-pos.onrender.com/api/device/products');
        const data = await res.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert data into api
export const insertProduct = createAsyncThunk('products/insertProduct', async (AddProduct, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://myphone-pos.onrender.com/api/device/products', {
            method: 'POST',
            body: JSON.stringify(AddProduct),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//get product details from api
export const productInfo = createAsyncThunk('products/productInfo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/products/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

//delete product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/products/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//filter products
export const FilterProduct = createAsyncThunk('products/FilterProduct', async (word, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://myphone-pos.onrender.com/api/device/products?ordering=${word}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return word;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//Edit product
const editProduct = createAsyncThunk('products/editProduct', async (Product, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`https://myphone-pos.onrender.com/api/device/products/${Product.id}`, {
            method: 'PATCH',
            body: JSON.stringify(Product),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        AllProducts: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get products
        [getAllProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllProducts = action.payload;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //get product details
        [productInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [productInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllProducts = state.Allproducts.filter((pro) => pro.id === action.payload)
        },
        [productInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new product
        [insertProduct.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllProducts.push(action.payload);
        },
        [insertProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete product
        [deleteProduct.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllProducts = state.AllProducts.filter(pro => pro.id !== action.payload);
        },
        [deleteProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //filter products
        [FilterProduct.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [FilterProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllProducts = state.AllProducts.filter(pro => pro.name === action.payload);
        },
        [FilterProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //Edit products 
        [editProduct.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [editProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllProducts = action.payload;
        },
        [editProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default ProductsSlice.reducer;