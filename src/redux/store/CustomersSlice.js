import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Create_First_Customer,
  Customer,
  Customer_Search,
} from "../../components/EndPointsLinks";

//get data from api
export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(Customer);
      const data = await res.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//insert Customer into api
export const insertCustomers = createAsyncThunk(
  "customers/insertCustomers",
  async (AddCustomer, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    await axios
      .post(Create_First_Customer, AddCustomer)
      .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
          toast.success("Create Customer Successful", {
            theme: "dark",
          });
        } else {
          toast.error("This Email Already Exists", {
            theme: "dark",
          });
        }
        console.log(response.status);
      })
      .catch(function (error) {
        let AllErrors = error.response.data;
        for (let key in AllErrors) {
          toast.error(key + ": " + AllErrors[key], {
            theme: "dark",
          });
        }
        return rejectWithValue(error.message);
      });
  }
);

//get customers details from api
export const CustomerInfo = createAsyncThunk(
  "customers/CustomerInfo",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(Customer_Search + id, {
        method: "GET",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//delete customer
export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(Customer + "/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// //filter customers
// export const FilterCustomer = createAsyncThunk(
//   "customers/FilterCustomer",
//   async (word, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       await fetch(
//         `https://myphone-pos.onrender.com/api/customers?format=api&ordering=${word}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json;charset=UTF-8" },
//         }
//       );
//       return word;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const CustomersSlice = createSlice({
  name: "customers",
  initialState: {
    AllCustomers: [{}],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    //get order
    [getAllCustomers.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllCustomers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.AllCustomers = action.payload;
    },
    [getAllCustomers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //get order details
    [CustomerInfo.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [CustomerInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.AllCustomers = state.AllCustomers.filter(
        (costomer) => costomer.id === action.payload
      );
    },
    [CustomerInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //insert new order
    [insertCustomers.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertCustomers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.AllCustomers.push(action.payload);
      state.error = "success"
    },
    [insertCustomers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //delete order
    [deleteCustomer.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.AllCustomers = state.AllCustomers.filter(
        (costomer) => costomer.id !== action.payload
      );
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // //filter Client
    // [FilterCustomer.pending]: (state, action) => {
    //   state.isLoading = true;
    //   state.error = null;
    // },
    // [FilterCustomer.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.AllCustomers = state.AllCustomers.filter(
    //     (costomer) => costomer.str === action.payload
    //   );
    // },
    // [FilterCustomer.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export default CustomersSlice.reducer;
