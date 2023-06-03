import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { Auth_Token } from '../../components/EndPointsLinks';


const loginUrl = Auth_Token;

export const userLogin = async (Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(loginUrl, Data)
            localStorage.setItem("token", JSON.stringify(res.data.access));
            console.log(res.data.access);
            // jti
            resolve(res)
        } catch (error) {
            error.message = "invalid username or password"
            reject(error)
        }
    })
}


let userToken = localStorage.getItem("token")



const initialState = {
    isLoading: false,
    isAuth: false,
    token: '',
    error: ''
}

const LoginSlice = createSlice({

    name: "login",
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.token = userToken;
            state.error = '';
        },
        loginFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
})

export const { reducer, actions } = LoginSlice;
export const { loginPending, loginSuccess, loginFail } = actions;
export default reducer;